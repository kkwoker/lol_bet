'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var request = require('request');

var keys = require('../../config/local.env');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  console.log("User#Create");
  var summonerName = req.body.summoner.name;
  console.log(req.body);
  var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + keys.RIOT_API_KEY;
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      console.log(body);
      var jsonBody = JSON.parse(body);
      console.log(jsonBody);
      var indexedName = Object.keys(jsonBody)[0];

      var user = {};
      user.provider = "local";
      user.email = req.body.email;
      user.password = req.body.password;
      var sumObj = jsonBody[indexedName]
      sumObj.indexName = indexedName;
      user.summoner = sumObj;
      console.log(user);
      
      var newUser = new User(user);
      newUser.save(function(err, user) {
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        return res.json({ token: token });
      });
    }
    if(response.statusCode === 404){
      console.log("SUMMONER NOT FOUND");
      return res.json(404, { "success": false});
    }
  })
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  console.log("User#Show");
  var userId = req.params.id;
  console.log(req.params);
  User.findById(userId, function (err, user) {

    // if (err) return next(err);
    // if (!user) return res.send(401);
    // res.json(user.profile);
    return res.json(200,{"user": user})
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
