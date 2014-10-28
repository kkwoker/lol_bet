/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var Match = require('../api/match/match.model');
var _ = require('lodash');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below

  require('../api/mailer/mailer.socket').register(socket);

  require('../api/stat/stat.socket').register(socket);

  require('../api/btc_transaction/btc_transaction.socket').register(socket);
  require('../api/match/match.socket').register(socket);
  require('../api/summoner/summoner.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);

    console.log('user-connected');

    socket.on('join-room', function(data) {

      Match.findById(data.room, function(err, match) {
        if (match.bet !== 0) {
          socket.emit('betting-complete', { pot: match.bet });
          socket.disconnect();
        }
      });

      socket.join(data.room);
      socket.room = data.room;
      /* Removing number of user detection for now
      if (socketio.sockets.in(data.room).sockets.length < 2) {
        socket.room = data.room;
        socket.join(data.room);
        console.log('joined room ' + data.room);
        socket.emit('welcome', { message: 'hello' });
      } else {
        console.log('Blocked access to room:' + data.room)
        console.log('too many users');
      }
      */

      // Start the betting if both players have joined the room
      if (socketio.sockets.in(data.room).sockets.length === 2) {
        socketio.sockets.in(data.room).emit('status', { ready: true });
        
        // Start the timer
        var time = 60;
        socketio.sockets.in(data.room).emit('countdown', { time: time });
        var countdown = setInterval(function() {
          time--;
          socketio.sockets.in(data.room).emit('countdown', { time: time });
          if(time === 0){
            clearInterval(countdown);
            socketio.sockets.in(data.room).emit('betting-complete');
          }
        }, 1000);
      }

      socket.on('bet', function(data) {
        socket.broadcast.to(socket.room).emit('bet', { bet: data.bet, lockedIn: data.lockedIn });
      });

      socket.on('set-pot', function(data) {
        console.log('setting pot to: ' + data.pot);
        socket.broadcast.to(socket.room).emit('set-pot', { pot: data.pot });
      });

      socket.on('save-bet', function(data) {
        Match.findById(data.match, function (err, match) {
          if (err) { return console.log(err); }
          var newMatch = { bet: data.bet }
          var updated = _.merge(match, newMatch);
          console.log(updated);
          updated.save(function (err) {
            if (err) { return console.log(err); }
          });
        });

        socket.disconnect();
      })
    })
  });
};