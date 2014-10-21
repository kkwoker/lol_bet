/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Champion = require('./champion.model');

exports.register = function(socket) {
  Champion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Champion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('champion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('champion:remove', doc);
}