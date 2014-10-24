'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
	_id: String,
  name: String,
  match: {},
  bet: { bet: Number, playerArr: Array },
  info: String,
  active: Boolean,
  winner: String
});

module.exports = mongoose.model('Match', MatchSchema);