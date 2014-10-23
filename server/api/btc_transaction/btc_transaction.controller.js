'use strict';
var keys = require('../../config/local.env.js');
var https = require('https');
var request = require('request');

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
  console.log("connected test");
  var transaction = {};
  var user_id = req.body.user_id;
  var callback_url = encodeURIComponent(keys.DOMAIN + '/btc_transactions/confirm');
  var url = 'https://blockchain.info/api/receive?method=create&address=' + keys.BITCOIN_ADDRESS +'&callback=' + callback_url;
  console.log(callback_url);

  request(url, function(error, response, body) {
    body = JSON.parse(body);
    console.log(body);
    console.log('destination: ' + body.destination);
    console.log('input address: ' + body["input_address"]);
    console.log('callback: ' + body["callback_url"]);
    if (error) { return res.json(400, error); };
    if (body["destination"] === keys.BITCOIN_ADDRESS) {
  
      transaction.input_address = body["input_address"];
      transaction.user_id = user_id;
      transaction.pending = true;

      BtcTransaction.create(transaction, function(err, btc_transaction) {
        if(err) { return handleError(res, err); }
        return res.json(201, btc_transaction.input_address);
      });
    } else {
        console.log('error: Incorect receiving bitcoin address ' + body);
    }
  });
};

//Get callback response from Blockchain.

exports.confirm = function(req, res) {

  console.log(req.body);

  // BtcTransaction.findById(req.params.id, function (err, btc_transaction) {
  //   if (err) { return handleError(res, err); }
  //   if(!btc_transaction) { return res.send(404); }
  //   var updated = _.merge(btc_transaction, req.body);
  //   updated.save(function (err) {
  //     if (err) { return handleError(res, err); }
  //     return res.json(200, btc_transaction);
  //   });
  // });

}

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