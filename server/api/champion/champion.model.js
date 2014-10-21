'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChampionSchema = new Schema({
	type: String,
	version: String,
	data: {},
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Champion', ChampionSchema);