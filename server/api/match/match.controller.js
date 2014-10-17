'use strict';

var _ = require('lodash');
var Match = require('./match.model');
var unirest = require('unirest');
var keys = require('../../config/local.env.js');
// Get list of matchs
exports.index = function(req, res) {
  Match.find(function (err, matchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, matchs);
  });
};

// Get a single match
exports.show = function(req, res) {
  console.log("HELLO");
  console.log(req.params.id);
  var summonerName = req.params.id;
  // see if summoner is in match and send
  unirest.get("https://community-league-of-legends.p.mashape.com/api/v1.0/NA/summoner/retrieveInProgressSpectatorGameInfo/"+ summonerName)
  .header("X-Mashape-Key", keys.MASHAPE_API_KEY)
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    var match = result.body;
    return res.json(200, match);
  });
  // if not send error

  // Match.findById(req.params.id, function (err, match) {
  //   if(err) { return handleError(res, err); }
  //   if(!match) { return res.send(404); }
  //   return res.json(match);
  // });
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