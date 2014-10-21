'use strict';

var _ = require('lodash');
var Champion = require('./champion.model');

// Get list of champions
exports.index = function(req, res) {
  Champion.find(function (err, champions) {
    if(err) { return handleError(res, err); }
    return res.json(200, champions);
  });
};

// Get a single champion
exports.show = function(req, res) {
  Champion.findById(req.params.id, function (err, champion) {
    if(err) { return handleError(res, err); }
    if(!champion) { return res.send(404); }
    return res.json(champion);
  });
};

// Creates a new champion in the DB.
exports.create = function(req, res) {
  Champion.create(req.body, function(err, champion) {
    if(err) { return handleError(res, err); }
    return res.json(201, champion);
  });
};

// Updates an existing champion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Champion.findById(req.params.id, function (err, champion) {
    if (err) { return handleError(res, err); }
    if(!champion) { return res.send(404); }
    var updated = _.merge(champion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, champion);
    });
  });
};

// Deletes a champion from the DB.
exports.destroy = function(req, res) {
  Champion.findById(req.params.id, function (err, champion) {
    if(err) { return handleError(res, err); }
    if(!champion) { return res.send(404); }
    champion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}