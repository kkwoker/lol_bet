'use strict';

var keys = require('../../config/local.env')
var _ = require('lodash');
var Stat = require('./stat.model');
var request = require('request');


exports.index = function(req, res) {
  Stat.find({}, '-salt -hashedPassword', function (err, stats) {
    if(err) return res.send(500, err);
    res.json(200, stats);
  });
};


// Get a single stat
exports.show = function(req, res) {
  var id = req.params.id;
  console.log(id); 
  var url = "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/"+id+"/ranked?api_key="+keys.RIOT_API_KEY;
   request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      console.log(JSON.parse(body));
      var jsonBody = JSON.parse(body);
      console.log(jsonBody);
      jsonBody.success = true;
      return res.json(200, jsonBody);
    }
    if(response.statusCode === 404){
      console.log("STAT NOT FOUND");
      var obj = {"success": false,
                 "error": "Summoner statistic not found."};
      return res.json(404, obj);
    }
  });
};

// Creates a new stat in the DB.
exports.create = function(req, res) {
  Stat.create(req.body, function(err, stat) {
    if(err) { return handleError(res, err); }
    return res.json(201, stat);
  });
};

// Updates an existing stat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stat.findById(req.params.id, function (err, stat) {
    if (err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    var updated = _.merge(stat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stat);
    });
  });
};

// Deletes a stat from the DB.
exports.destroy = function(req, res) {
  Stat.findById(req.params.id, function (err, stat) {
    if(err) { return handleError(res, err); }
    if(!stat) { return res.send(404); }
    stat.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}