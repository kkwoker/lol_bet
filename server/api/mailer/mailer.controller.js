'use strict';

var _ = require('lodash');
var Mailer = require('./mailer.model');
var nodemailer = require('nodemailer');
var keys = require('../../config/local.env.js');

var smtpTransport = nodemailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "lolbetapp@gmail.com",
pass: keys.LOLBETGMAILPASS
}
});

// Get list of mailers
exports.index = function(req, res) {
  Mailer.find(function (err, mailers) {
    if(err) { return handleError(res, err); }
    return res.json(200, mailers);
  });
};

// Get a single mailer
exports.show = function(req, res) {
  Mailer.findById(req.params.id, function (err, mailer) {
    if(err) { return handleError(res, err); }
    if(!mailer) { return res.send(404); }
    return res.json(mailer);
  });
};

// Creates a new mailer in the DB.
exports.create = function(req, res) {
  
  var mailOptions = {
    to : "lolbetapp@gmail.com",
    subject : "Withdrawal request - UserId: " + req.body.userId,
    text : "User " + req.body.userId + "\n" 
            + "Withdrawal amount: " + req.body.withdrawValue + "\n"
            + "Btc address: " + req.body.btcAddress + "\n" 
            + "Sent on: " + req.body.sentOn
  };

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
  
  return res.json(201);
};

// Updates an existing mailer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mailer.findById(req.params.id, function (err, mailer) {
    if (err) { return handleError(res, err); }
    if(!mailer) { return res.send(404); }
    var updated = _.merge(mailer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mailer);
    });
  });
};

// Deletes a mailer from the DB.
exports.destroy = function(req, res) {
  Mailer.findById(req.params.id, function (err, mailer) {
    if(err) { return handleError(res, err); }
    if(!mailer) { return res.send(404); }
    mailer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}