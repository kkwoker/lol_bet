/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Summoner = require('./summoner.model');

exports.register = function(socket) {
  Summoner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Summoner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('summoner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('summoner:remove', doc);
}