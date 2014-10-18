'use strict';

var _ = require('lodash');
var Match = require('./match.model');
var User = require('../user/user.model');
var unirest = require('unirest');
var keys = require('../../config/local.env.js');
// Get list of matchs
exports.index = function(req, res) {
  Match.find(function (err, matchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, matchs);
  });
};

exports.search = function(req, res){
  var summonerName = req.params.indexName;
  // Check if he has an active match in our database
  // if he has an active match in our database, return it
  var expression = [{"match.teamOne.name": summonerName}, {"match.teamTwo.name": summonerName}];
  Match.findOne(expression, function(err, match){
    if(match){
      console.log("Found a match in the database");
      return res.json(200, match);
    }else{
      console.log("Did not find a match in the database");
      console.log("Looking at the Riot API");
      unirest.get("https://community-league-of-legends.p.mashape.com/api/v1.0/na/summoner/retrieveInProgressSpectatorGameInfo/"+ summonerName)
        .header("X-Mashape-Key", keys.MASHAPE_API_KEY)
        .end(function (result) {
          var match = result.body;
          if(result.body.success){
            console.log("THERE IS NO MATCH");
            return res.json(404, match);
          }else{
            console.log("MATCH FOUND");
            match = parseMatch(match);
            var newMatch = new Match(match);
            newMatch.save(function(err,match){
              return res.json(200, match)
            })
          }
        })
    }
  });
}
function parseMatch(match){
  var one = match.game.teamOne.array;
  var two = match.game.teamTwo.array;
  var teamOne = [].map.call(one ,function(player){
    return player.summonerInternalName;
  })
  var teamTwo = [].map.call(two ,function(player){
    return player.summonerInternalName;
  })
  var arr = match.game.playerChampionSelections.array;
  var champOBJ = {}
  for(var i in arr){
    champOBJ[arr[i].summonerInternalName] = arr[i].championId;
  }
      
  var t1 = [];
  for( var i in teamOne){
    t1.push({"name": teamOne[i], "champId": champOBJ[teamOne[i]]})
  }
  var t2 = [];
  for( var i in teamTwo){
    t2.push({"name": teamTwo[i], "champId": champOBJ[teamTwo[i]]})
  }
  var matchObj = {
    "teamOne": t1,
    "teamTwo": t2
  }
  var bet = {
    "playerArr": ['herpofthederp', 'eufo']
  }
  var obj = {
    "_id": match.playerCredentials.gameId,
    "match": matchObj,
    "bet": bet
  }
  return obj;

}

//       var newMatch = new Match(obj);
//       newMatch.save(function(err, match){
//         return res.json(200, match);
//       })


//       // return res.json(200, obj);
//     }
//   });
    
//     }
//   });  
  
// }


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
  return ['notCool1','notCool2','notCool3','eufo','notCool5']
  // var one = match.game.teamOne.array;
  // var teamOne = [].map.call(one ,function(player){
  //   return player.summonerInternalName;
  // })
  // var two = match.game.teamTwo.array;
  // var teamTwo = [].map.call(two, function(player){
  //   return player.summonerInternalName;
  // })

  // for(var i in teamOne){
  //   console.log(teamOne[i]);
  //   if (teamOne[i] == summonerName) {
  //     console.log("He is in teamOne");
  //     return teamTwo;
  //   }
  // }
  // for(var i in teamTwo){
  //   console.log(teamTwo[i]);
  //   if (teamTwo[i] == summonerName) {
  //     console.log("He is in teamTwo");
  //     return teamOne;
  //   }
  // }
}