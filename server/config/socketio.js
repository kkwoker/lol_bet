/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

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
      console.log('data sent: ' + data);

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
        socketio.sockets.in(data.room).emit('ready', { ready: true });
        
        // Start the timer
        var time = 30;
        socketio.sockets.in(data.room).emit('countdown', { time: time });
        var countdown = setInterval(function() {
          time--;
          socketio.sockets.in(data.room).emit('countdown', { time: time });  
          if(time === 0){
            clearInterval(countdown);
          }
        }, 1000);
      }

      console.log(socketio.sockets.in(data.room).sockets.length + " users in room " + data.room);
      console.log('list of rooms: ' + socket.rooms);
      console.log('socket\'s room: ' + socket.room);

      socket.on('bet', function(data) {
        socket.broadcast.to(socket.room).emit('bet', { bet: data.bet, lockedIn: data.lockedIn });
      });
    })
  });
};