/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Btcexchange = require('./btcexchange.model');

exports.register = function(socket) {
  Btcexchange.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Btcexchange.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('btcexchange:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('btcexchange:remove', doc);
}