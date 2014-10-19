'use strict';

var _ = require('lodash');
var Match = require('./match.model');
var User = require('../user/user.model');
var unirest = require('unirest');
var request = require('request');
var keys = require('../../config/local.env.js');
var async = require('async');
// Get list of matchs
exports.index = function(req, res) {
  Match.find(function (err, matchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, matchs);
  });
};

exports.search = function(req, res){
  var summonerName = req.params.indexName;
  var nameInTeam1or2 = [{"match.teamOne.name": summonerName}, {"match.teamTwo.name": summonerName}];
  Match.findOne(nameInTeam1or2, function(err, match){
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
            return findPlayers(result.body)
          }
        })
  }

  function findPlayers(match){
    var teamOne = [].map.call(match.game.teamOne.array ,function(player){
      return player.summonerInternalName;
    })
    var teamTwo = [].map.call(match.game.teamTwo.array ,function(player){
      return player.summonerInternalName;
    })
    var players = teamOne.concat(teamTwo);
    return getSummoners(match, players, teamOne, teamTwo);
  }

  function getSummoners(match, players, teamOne, teamTwo){
    var playerString = players.join(',');
    var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + playerString + "?api_key=" + keys.RIOT_API_KEY;    
    request(url, function(error, response, body){
      var summoners = JSON.parse(body);
      return parseMatch(match, summoners, teamOne, teamTwo);
    })
  }

  function parseMatch(match, summoners, teamOne, teamTwo){
    
    var arr = match.game.playerChampionSelections.array;
    var champs = {}
    for(var i in arr){
      champs[arr[i].summonerInternalName] = arr[i].championId;
    }

    var t1 = [];
    for( var b in teamOne){
      t1.push({"name": teamOne[b], "champId": champs[teamOne[b]], "summoner": summoners[teamOne[b]]})
    }
    var t2 = [];
    for( var d in teamTwo){
      t2.push({"name": teamTwo[d], "champId": champs[teamTwo[d]], "summoner": summoners[teamTwo[d]]})
    }
    var matchNew = {
      "teamOne": t1,
      "teamTwo": t2
    }
    var bet = {
      "playerArr": ['herpofthederp', 'eufo']
    }

    var obj = {
      "_id": match.playerCredentials.gameId,
      "match": matchNew,
      "bet": bet,
      "active": true
    }
    var newMatch = new Match(obj);
    newMatch.save(function(err, match){
      return res.json(200, obj);  
    })
  }

}

function opposingWithAccountsAndActive(summonerName, match){
  var opposing = findUsersOpponentTeam(summonerName, match);
  // check if they have accounts
  console.log(opposing);
  for(var i in opposing){
    console.log(opposing[i]);
    User.findOne({"summoner.indexName": opposing[i]}, function(err, better){
      if(better){
        //AND NEEDS TO BE ACTIVE
        console.log("FOUND SOMEONE TO BET WITH!");
      }else{
        console.log(opposing[i] + " does not have an account with us");
      }
    })
  }
}

// Get a single match
exports.show = function(req, res) {
  // console.log("show");
  // console.log(req.params.id);
  // var summonerName = req.params.id;
  
    
  
  // if not send error

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
  // console.log("t1: "+teamOne);
  // console.log("t2: "+teamTwo);

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