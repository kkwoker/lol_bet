'use strict';
var keys = require('../../config/local.env')

var _ = require('lodash');
var Summoner = require('./summoner.model');
var User = require('../user/user.model');
var request = require('request');
// Get list of summoners
exports.index = function(req, res) {
  Summoner.find(function (err, summoners) {
    if(err) { return handleError(res, err); }
    return res.json(200, summoners);
  });
};

// Get a single summoner
exports.show = function(req, res) {
  var summonerName = req.params.id;
  var lowerCaseName = summonerName.toLowerCase();
  User.findOne({'summoner.indexName': lowerCaseName}, function(err, person){
    if(person){
      console.log("THIS PERSON IS ALREADY IN THE database");
      // This person is already in the database
      var body = {"summoner": person, "success": false, "error": "This summoner name has already been taken"};
      return res.json(200,body)
    }else{
      console.log("This name is not in the database");
      var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + keys.RIOT_API_KEY;    
      request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
          console.log(JSON.parse(body));
          var jsonBody = JSON.parse(body);
          console.log(jsonBody);
          jsonBody.success = true;
          return res.json(200, jsonBody);
        }
        if(response.statusCode === 404){
          console.log("SUMMONER NOT FOUND");
          var obj = {"success": false,
                     "error": "Summoner name is not found."};
          return res.json(404, obj);
        }
      })
    }
  })
};

// Creates a new summoner in the DB.
exports.create = function(req, res) {
  Summoner.create(req.body, function(err, summoner) {
    if(err) { return handleError(res, err); }
    return res.json(201, summoner);
  });
};

// Updates an existing summoner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Summoner.findById(req.params.id, function (err, summoner) {
    if (err) { return handleError(res, err); }
    if(!summoner) { return res.send(404); }
    var updated = _.merge(summoner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, summoner);
    });
  });
};

// Deletes a summoner from the DB.
exports.destroy = function(req, res) {
  Summoner.findById(req.params.id, function (err, summoner) {
    if(err) { return handleError(res, err); }
    if(!summoner) { return res.send(404); }
    summoner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}