'use strict';
var https = require('https');
var request = require('request');
var http = require('http');
var _ = require('lodash');
var Btcexchange = require('./btcexchange.model');

// Get list of btcexchanges
exports.index = function(req, res) {
  Btcexchange.find(function (err, btcexchanges) {
    if(err) { return handleError(res, err); }
    console.log(btcexchanges);
    return res.json(200, btcexchanges);
  });
};

// Get a single btcexchange
exports.show = function(req, res) {
  Btcexchange.findById(req.params.id, function (err, btcexchange) {
    if(err) { return handleError(res, err); }
    if(!btcexchange) { return res.send(404); }
    if(Date.now() - btcexchange.updated_at > 60000){
      request('https://blockchain.info/ticker', function (error, response, body) {
        var body = JSON.parse(body);
        if (!error && response.statusCode == 200) {
          for (var i in body) {
            delete body[i]['symbol'];
          }
          _.merge(btcexchange, body);
          btcexchange.updated_at = Date.now();
          btcexchange.save(function (err) {
            if (err) { return handleError(res, err); }
            console.log("success");
            return res.json(200, btcexchange);
          });
        }     
      }); 
    }
    else {
      console.log("under 1min");
      return res.json(200, btcexchange);
    }
    });
};

// Creates a new btcexchange in the DB.
exports.create = function(req, res) {
  Btcexchange.create(req.body, function(err, btcexchange) {
    if(err) { return handleError(res, err); }
    return res.json(201, btcexchange);
  });
};

// Updates an existing btcexchange in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Btcexchange.findById(req.params.id, function (err, btcexchange) {
    if (err) { return handleError(res, err); }
    if(!btcexchange) { return res.send(404); }
    var updated = _.merge(btcexchange, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, btcexchange);
    });
  });
};

// Deletes a btcexchange from the DB.
exports.destroy = function(req, res) {
  Btcexchange.findById(req.params.id, function (err, btcexchange) {
    if(err) { return handleError(res, err); }
    if(!btcexchange) { return res.send(404); }
    btcexchange.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}