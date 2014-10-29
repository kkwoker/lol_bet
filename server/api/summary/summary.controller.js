'use strict';

var keys = require('../../config/local.env')
var _ = require('lodash');
var Summary = require('./summary.model');
var request = require('request');

// Get list of summarys
exports.index = function(req, res) {
  Summary.find(function (err, summarys) {
    if(err) { return handleError(res, err); }
    return res.json(200, summarys);
  });
};

exports.show = function(req, res) {
  var id = req.params.id;
  var url = "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/"+id+"/summary?api_key="+keys.RIOT_API_KEY;
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

// Creates a new summary in the DB.
exports.create = function(req, res) {
  Summary.create(req.body, function(err, summary) {
    if(err) { return handleError(res, err); }
    return res.json(201, summary);
  });
};

// Updates an existing summary in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Summary.findById(req.params.id, function (err, summary) {
    if (err) { return handleError(res, err); }
    if(!summary) { return res.send(404); }
    var updated = _.merge(summary, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, summary);
    });
  });
};

// Deletes a summary from the DB.
exports.destroy = function(req, res) {
  Summary.findById(req.params.id, function (err, summary) {
    if(err) { return handleError(res, err); }
    if(!summary) { return res.send(404); }
    summary.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}