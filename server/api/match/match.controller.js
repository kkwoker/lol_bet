'use strict';

var _ = require('lodash');
var Match = require('./match.model');
var User = require('../user/user.model');
var unirest = require('unirest');
var request = require('request');
var keys = require('../../config/local.env.js');
var async = require('async');
var http = require('http');

// Get list of matchs
exports.index = function(req, res) {
  Match.find(function (err, matchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, matchs);
  });
};

exports.search = function(req, res){
  var summonerName = req.params.indexName;
  var nameInTeam1or2 = {$or : [{"match.teamOne.name": summonerName}, {"match.teamTwo.name": summonerName}]};
  console.log(summonerName);
  Match.findOne(nameInTeam1or2).where('active').equals(true).exec(function(err, match){
    if(match){
      console.log("Found a match in the database");
      return res.json(200, match);
    }else{
      console.log("Did not find a match in the database");
      return lookForMatchAtRiot(summonerName);
    }
  })

  function lookForMatchAtRiot(summonerName){
    console.log("Looking at the Riot API");
    unirest.get("https://community-league-of-legends.p.mashape.com/api/v1.0/na/summoner/retrieveInProgressSpectatorGameInfo/"+ summonerName)
        .header("X-Mashape-Key", keys.MASHAPE_API_KEY)
        .end(function (result) {
          if(result.body && result.body.success){
            console.log("THERE IS NO MATCH");
            return res.json(404, result.body);
          }else{
            console.log("MATCH FOUND");
            return findPlayers(result.body, summonerName)
          }
        })
  }

  function findPlayers(match, summonerName){
    var teamOne = _.map(match.game.teamOne.array ,function(player){
      return player.summonerInternalName;
    })
    var teamTwo = _.map(match.game.teamTwo.array ,function(player){
      return player.summonerInternalName;
    })
    var players = teamOne.concat(teamTwo);
    return getSummoners(match, players, teamOne, teamTwo, summonerName);
  }

  function getSummoners(match, players, teamOne, teamTwo, summonerName){
    console.log("getSummoners");
    var playerString = players.join(',');
    var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + playerString + "?api_key=" + keys.RIOT_API_KEY;    
    request(url, function(error, response, body){
      var summoners = JSON.parse(body);
      for(var i in teamOne){
        summoners[teamOne[i]]["teamId"] = "teamOne";
      }
      for(var i in teamTwo){
        summoners[teamTwo[i]]["teamId"] = "teamTwo";
      }
      return getLeagues(match, summoners, teamOne, teamTwo, summonerName);
    })
  }

  function getLeagues(match, summoners, teamOne, teamTwo, summonerName){
    // map summoners into IDs
    console.log("getLeagues");
    var summonerIds = _.map(summoners, function(player){
      return player.id;
    })

    var idString = summonerIds.join(',');
    var url = "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + idString + "/?api_key=" + keys.RIOT_API_KEY;
    request(url, function(error, response, body){
      var leagues = _.map(JSON.parse(body), function(player){
        return player[0].tier;
      })
      var l = 0;
      for(var i in summoners){
        summoners[i]["league"] = leagues[l];
        l++;
      }

      // return parseMatch(match, summoners, teamOne, teamTwo, summonerName);
      return getChampNames(match, summoners, teamOne, teamTwo, summonerName);
    })
  }

  function getChampNames(match, summoners, teamOne, teamTwo, summonerName){
    console.log("getChamps");
    var arr = match.game.playerChampionSelections.array;
    var champs = {}
    for(var i in arr){
      champs[arr[i].summonerInternalName] = arr[i].championId;
    }
    var url = "https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=" + keys.RIOT_API_KEY;
    request(url, function(error, response, body){
      // console.log(body);
      var jsonBody = JSON.parse(body);
      var allChamps = jsonBody.data;
      for(var i in champs){
        for(var c in allChamps){
          if(champs[i] == allChamps[c].id){
            champs[i] = allChamps[c].key;
          }
        }
      }
      console.log(champs);

      return parseMatch(match, summoners, teamOne, teamTwo, summonerName, champs)
    })
      

    
  }

  function parseMatch(match, summoners, teamOne, teamTwo, summonerName, champs){

    var t1 = [];
    for( var b in teamOne){
      t1.push({"name": teamOne[b], "champImg": champs[teamOne[b]], "summoner": summoners[teamOne[b]]})
    }
    var t2 = [];
    for( var d in teamTwo){
      t2.push({"name": teamTwo[d], "champImg": champs[teamTwo[d]], "summoner": summoners[teamTwo[d]]})
    }
    var matchNew = {
      "teamOne": t1,
      "teamTwo": t2
    }
    var p1 = {}
    p1[summonerName] = summoners[summonerName]
    var p2 = {}
    var bet = {
      "playerArr": [p1, p2],
      "bet": 0
    }

    var obj = {
      "_id": match.playerCredentials.gameId,
      "match": matchNew,
      "bet": 0,
      "playerArr": [p1, p2],
      "active": true
    }

    return onlyIfOpponentisRegistered(obj, summonerName, summoners);

  }

  function onlyIfOpponentisRegistered(match, summonerName, summoners){
    console.log(summonerName);
    var opposing = findUsersOpponentTeam(summonerName, match);
    async.map(opposing, function(player, callback) {
      User.findOne({"summoner.indexName": player}, function(err, bidder){
        if(bidder){
          console.log(bidder + " FOUND SOMEONE TO BET WITH! ");
          callback(null, player);
        }else{
          callback(null);
        }
      })

    }, function(err, result){
      var bidders = _.filter(result, function(player) { 
        if(typeof player === 'undefined'){
          return false;
        }else{
          return true;
        }
      })
      console.log("bidders: " + bidders);
      match.playerArr[1][bidders[0]] = summoners[bidders[0]];
      // if(summoners[bidders[0]]){
        var newMatch = new Match(match);
          newMatch.save(function(err, matchRes){
            console.log("returning match");
            return res.json(200, matchRes);  
        })
      // }else{
      //   match["error"] = "Match found but no one to bet with";
      //   return res.json(200, match)
      // }
    });

  }

}


// Get a single match
exports.show = function(req, res) {
  Match.findById(req.params.id, function (err, match) {
    if(err) { return handleError(res, err); }
    if(!match) { return res.send(404); }
    return res.json(match);
  });
};

// Creates a new match in the DB.
exports.create = function(req, res) {
  Match.create(req.body, function(err, match) {
    if(err) { return handleError(res, err); }
    return res.json(201, match);
  });
};

// Updates an existing match in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Match.findById(req.params.id, function (err, match) {
    if (err) { return handleError(res, err); }
    if(!match) { return res.send(404); }
    var updated = _.merge(match, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, match);
    });
  });
};

// Deletes a match from the DB.
exports.destroy = function(req, res) {
  Match.findById(req.params.id, function (err, match) {
    if(err) { return handleError(res, err); }
    if(!match) { return res.send(404); }
    match.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};



function handleError(res, err) {
  return res.send(500, err);
}

function findUsersOpponentTeam(summonerName, match){
  // return ['summoner1','summoner2','summoner3','eufo','summoner5']
  var one = match.match.teamOne;
  // console.log(one);
  var teamOne = [].map.call(one ,function(player){
    return player.name;
  })
  var two = match.match.teamTwo;
  var teamTwo = [].map.call(two, function(player){
    return player.name;
  })
  console.log("t1: "+teamOne);
  console.log("t2: "+teamTwo);

  for(var i in teamOne){
    // console.log(teamOne[i]);
    if (teamOne[i] == summonerName) {
      console.log("I am in teamOne");
      return teamTwo;
    }
  }
  for(var i in teamTwo){
    // console.log(teamTwo[i]);
    if (teamTwo[i] == summonerName) {
      console.log("I am in teamTwo");
      return teamOne;
    }
  }
}




exports.gameCompletion = function(req, res){
  var gameId = req.params.id;
  // console.log("Running game completion");
  var url = "http://na.api.pvp.net/api/lol/na/v2.2/match/" + gameId + "?api_key=" + keys.RIOT_API_KEY;
  // console.log(url);
  request(url, function(err, response, body){
  //   console.log(response.statusCode);
    if(response && response.statusCode == "404"){
      return res.json(200, {"finished": false}) 
    }else if(response.statusCode == "200"){
      var jsonBody = JSON.parse(body);
      var obj = {};
      obj["finished"] = true;
      obj["teamOne"] = jsonBody.teams[0].winner;
      obj["teamTwo"] = jsonBody.teams[1].winner;
      var winner;
      if(obj["teamOne"]){
        winner = "teamOne";
      }else if (obj["teamTwo"]){
        winner = "teamTwo"
      }

      // Move wallet money


      // Update active state of match
      Match.findById(gameId, function (err, match) {
        console.log(match);
        if (err) { return res.json(200, obj); }
        if(!match) { return res.send(404); }
        var updated = _.merge(match, {"active": false, "winner": winner});
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, obj);
        });
      });

      
    }  
  })
  
}
