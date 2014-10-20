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
          if(result.body.success){
            console.log("THERE IS NO MATCH");
            return res.json(404, result.body);
          }else{
            console.log("MATCH FOUND");
            return res.json(200,result.body);
            // return findPlayers(result.body, summonerName)
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
    // return isAnyOpponentRegistered(match, players, teamOne, teamTwo, summonerName);
  }

  function getSummoners(match, players, teamOne, teamTwo, summonerName){
    var playerString = players.join(',');
    var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + playerString + "?api_key=" + keys.RIOT_API_KEY;    
    request(url, function(error, response, body){
      var summoners = JSON.parse(body);
      return parseMatch(match, summoners, teamOne, teamTwo, summonerName);
    })
  }

  function parseMatch(match, summoners, teamOne, teamTwo, summonerName){
    
    var arr = match.game.playerChampionSelections.array;
    var champs = {}
    for(var i in arr){
      champs[arr[i].summonerInternalName] = arr[i].championId;
    }

    var t1 = [];
    for( var i in teamOne){
      t1.push({"name": teamOne[i], "champId": champs[teamOne[i]], "summoner": summoners[teamOne[i]]})
    }
    var t2 = [];
    for( var i in teamTwo){
      t2.push({"name": teamTwo[i], "champId": champs[teamTwo[i]], "summoner": summoners[teamTwo[i]]})
    }
    var matchNew = {
      "teamOne": t1,
      "teamTwo": t2
    }
    var bet = {
      "playerArr": [summonerName, 'eufo'],
      "bet": 0
    }

    var obj = {
      "_id": match.playerCredentials.gameId,
      "match": matchNew,
      "bet": bet,
      "active": true
    }

    return onlyIfOpponentisRegistered(obj, summonerName);

    // return res.json(200, match);  
  }

  function onlyIfOpponentisRegistered(match, summonerName){
    console.log(summonerName);
    var opposing = findUsersOpponentTeam(summonerName, match);
    async.map(opposing, function(player, callback) {
      console.log("Playername is " + player);
      User.findOne({"summoner.indexName": player}, function(err, bidder){
        if(bidder){
          console.log(bidder + " FOUND SOMEONE TO BET WITH! " + player);
          callback(null, player);
        }else{
          console.log(player + " does not have an account");
          callback(null);
        }
      })

    }, function(err, result){
      console.log(result);
      var bidders = _.filter(result, function(player) { 
        if(typeof player === 'undefined'){
          return false;
        }else{
          return true;
        }
      })
      console.log("bidders: " + bidders);
      match.bet.playerArr[1] = bidders[0];

      var newMatch = new Match(match);
        newMatch.save(function(err, matchRes){
        return res.json(200, matchRes);  
      })
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

exports.gameCompletion = function(req, res){
  var gameId = req.params.id;
  console.log("Running game completion");
  var url = "http://na.api.pvp.net/api/lol/na/v2.2/match/" + gameId + "?api_key=" + keys.RIOT_API_KEY;
  console.log(url);
  request(url, function(err, response, body){
    console.log(response.statusCode);
    if(response.statusCode == "404"){
      return res.json(200, {"finished": false}) 
    }else if(response.statusCode == "200"){
      var jsonBody = JSON.parse(body);
      jsonBody["finished"] = true;
      return res.json(200, jsonBody);
    }
  })
}


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