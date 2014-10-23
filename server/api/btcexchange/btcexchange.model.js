'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BtcexchangeSchema = new Schema({
  usd: String
});

module.exports = mongoose.model('Btcexchange', BtcexchangeSchema);