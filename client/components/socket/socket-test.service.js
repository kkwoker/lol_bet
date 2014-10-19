'use strict';
angular.module('lolBetApp')
.factory('socketTest', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    return socket;
});