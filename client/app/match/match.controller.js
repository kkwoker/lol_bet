'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', 'socket-test', 
    function ($scope, socket) {
    console.log(socket);

    $scope.sendMessage = function() {
      console.log('sending');
      socket.socket.emit('message', $scope.nickName, $scope.message);
      $scope.message = '';
    };

    $scope.$on('socket:broadcast', function(event, data) {
      console.log('got a message', event.name);
      if (!data.payload) {
        console.log('invalid message', 'event', event, 
                   'data', JSON.stringify(data));
        return;
      } 
      $scope.$apply(function() {
        $scope.messageLog = data.source + data.payload + $scope.messageLog;
      });
    });

    socket.syncUpdates();
  }]);
