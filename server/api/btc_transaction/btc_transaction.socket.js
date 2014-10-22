/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var BtcTransaction = require('./btc_transaction.model');

exports.register = function(socket) {
  BtcTransaction.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  BtcTransaction.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('btc_transaction:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('btc_transaction:remove', doc);
}