'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', '$interval', 'matchData', 'currentUser', 'socket',
    function ($scope, $interval, matchData, currentUser, socket) {
    $scope.player = {
      name: currentUser.summoner.indexName,
      bet: 0,
      lockedIn: false,
      iconUrl:'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + currentUser.summoner.profileIconId + '.png'
    };
    $scope.opponent = {
      bet: 0,
      lockedIn: false
    };

    $scope.match = {
      active: true
    };

    $scope.match.timer = $scope.match.timer || 60;

    // Get the opposing player
    angular.forEach(matchData.data.bet.playerArr, function(tvalue, tkey) {
      angular.forEach(tvalue, function(pvalue, pkey) {
        if (pkey !== $scope.player.name) {
          $scope.opponent.name = pkey;
          $scope.opponent.iconUrl = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + pvalue.profileIconId + '.png';
        }
      });
    });

    // Get the player's team
    angular.forEach(matchData.data.match, function(tvalue, tkey) {
      angular.forEach(tvalue, function(pvalue, index) {
        if (pvalue.name === $scope.player.name) {
          $scope.player.team = tvalue;
        }
        if (pvalue.name === $scope.opponent.name) {
          $scope.opponent.team = tvalue;
        }
      });
    });

    // Send a bet
    $scope.sendBet = function() {
      socket.socket.emit('bet', { bet: $scope.player.bet, lockedIn: $scope.player.lockedIn });
    };

    // Lock in bet
    $scope.lockIn = function() {
      $scope.player.lockedIn = true;
      $scope.sendBet();
    };

    // Join or create a betting room
    socket.socket.on('connect', function() {
      socket.socket.emit('join-room', { 
        room: matchData.data._id, 
        user: currentUser._id, 
        active: $scope.matchActive});

      socket.socket.on('status', function() {
        console.log('ready to start betting!');
        $scope.sendBet();
        socket.socket.on('countdown', function(data){
          $scope.match.timer = data.time;
        });
      });

      socket.socket.on('bet', function(data) {
        $scope.opponent.bet = data.bet;
        $scope.opponent.lockedIn = data.lockedIn;

        if (($scope.opponent.lockedIn && $scope.player.lockedIn) && 
          ($scope.opponent.bet === $scope.player.bet)) {
          $scope.pot = data.bet;
          socket.socket.emit('set-pot', { bet: $scope.pot });
        }
      });

      socket.socket.on('set-pot', function(data) {
        $scope.pot = data.bet;
      });

      socket.socket.on('betting-complete', function() {
        $scope.match.active = false;
        if ($scope.opponent.lockedIn && $scope.player.lockedIn) {
          socket.socket.emit('save-bet', { match: matchData.data._id, bet: $scope.pot });
        }
        socket.socket.removeAllListeners();
      });
    });
  }]);
