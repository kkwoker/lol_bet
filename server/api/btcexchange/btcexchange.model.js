'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BtcexchangeSchema = new Schema({
  USD: {},
  ISK: {},
  HKD: {},
  TWD: {},
  CHF: {},
  EUR: {},
  DKK: {},
  CLP: {},
  CAD: {},
  CNY: {},
  THB: {},
  AUD: {},
  SGD: {},
  KRW: {},
  JPY: {},
  PLN: {},
  GBP: {},
  SEK: {},
  NZD: {},
  BRL: {},
  RUB: {},
  updated_at: Number
});

module.exports = mongoose.model('Btcexchange', BtcexchangeSchema);