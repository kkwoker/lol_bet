'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SummarySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Summary', SummarySchema);