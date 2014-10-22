'use strict';

var _ = require('lodash');
var BtcTransaction = require('./btc_transaction.model');

// Get list of btc_transactions
exports.index = function(req, res) {
  BtcTransaction.find(function (err, btc_transactions) {
    if(err) { return handleError(res, err); }
    return res.json(200, btc_transactions);
  });
};

// Get a single btc_transaction
exports.show = function(req, res) {
  BtcTransaction.findById(req.params.id, function (err, btc_transaction) {
    if(err) { return handleError(res, err); }
    if(!btc_transaction) { return res.send(404); }
    return res.json(btc_transaction);
  });
};

// Creates a new btc_transaction in the DB.
exports.create = function(req, res) {
  BtcTransaction.create(req.body, function(err, btc_transaction) {
    if(err) { return handleError(res, err); }
    return res.json(201, btc_transaction);
  });
};

// Updates an existing btc_transaction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  BtcTransaction.findById(req.params.id, function (err, btc_transaction) {
    if (err) { return handleError(res, err); }
    if(!btc_transaction) { return res.send(404); }
    var updated = _.merge(btc_transaction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, btc_transaction);
    });
  });
};

// Deletes a btc_transaction from the DB.
exports.destroy = function(req, res) {
  BtcTransaction.findById(req.params.id, function (err, btc_transaction) {
    if(err) { return handleError(res, err); }
    if(!btc_transaction) { return res.send(404); }
    btc_transaction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}