'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BtcTransactionSchema = new Schema({
  user_id: String,
  input_address: String,
  pending: Boolean,
  amount: Number,
  transaction_hash: String,
  success: Boolean,

});

module.exports = mongoose.model('BtcTransaction', BtcTransactionSchema);