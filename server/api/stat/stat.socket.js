/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stat = require('./stat.model');

exports.register = function(socket) {
  Stat.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stat:remove', doc);
}