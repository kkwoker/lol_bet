'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', '$http', 'socket', 
    function ($scope, $http, socket) {
    console.log(socket);
    $scope.myBet = 0;
    $scope.opponentBet = 0;

    $scope.joinRoom = function() {
      socket.socket.emit('join-room', { room: $scope.room });
    };

    $scope.sendBet = function() {
      socket.socket.emit('bet', { room: $scope.room, bet: $scope.myBet });
    };

    $scope.increaseBet = function() {
      $scope.myBet++;
      $scope.sendBet();
    };

    $scope.decreaseBet = function() {
      $scope.myBet--;
      $scope.sendBet();
    };

    socket.socket.on('bet', function(data) {
      $scope.opponentBet = data.bet;
    });

  }]);
