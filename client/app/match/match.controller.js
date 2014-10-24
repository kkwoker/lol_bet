'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', '$interval', 'matchData', 'currentUser', 'socket',
    function ($scope, $interval, matchData, currentUser, socket) {
    $scope.player = {
      indexName: currentUser.summoner.indexName,
      name: currentUser.summoner.name,
      bet: 0,
      iconUrl:'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + currentUser.summoner.profileIconId + '.png'
    };
    $scope.opponent = {
      bet: 0,
      lockedIn: 0
    };

    $scope.match = {
      start: true,
      confirmed: false,
      complete: false
    };
    console.log(matchData);

    $scope.match.timer = $scope.match.timer || 60;

    // Get the opposing player
    angular.forEach(matchData.data.playerArr, function(tvalue, tindex) {
      var key = Object.keys(tvalue)[0];
      if (tvalue[key].name !== $scope.player.name) {
        $scope.opponent.name = tvalue[key].name;
        $scope.opponent.indexName = key;
        $scope.opponent.iconUrl = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + tvalue[key].profileIconId + '.png';
      }
    });

    // Get the player's team
    angular.forEach(matchData.data.match, function(tvalue, tkey) {
      angular.forEach(tvalue, function(pvalue, index) {
        if (pvalue.name === $scope.player.indexName) {
          $scope.player.team = tvalue;
        }
        if (pvalue.name === $scope.opponent.indexName) {
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
      $scope.player.lockedIn = $scope.player.bet;
      socket.socket.emit('bet', { bet: $scope.player.bet, lockedIn: $scope.player.lockedIn });
    };

    // Join or create a betting room
    socket.socket.on('connect', function() {
      socket.socket.emit('join-room', { 
        room: matchData.data._id, 
        user: currentUser._id, 
      });

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

        if (($scope.opponent.lockedIn && $scope.player.lockedIn)) {
          $scope.pot = data.lockedIn < $scope.player.lockedIn ? data.lockedIn : $scope.player.lockedIn;
          $scope.match.start = false;
          $scope.match.confirmed = true;
          socket.socket.emit('set-pot', { pot: $scope.pot });
        }
      });

      socket.socket.on('set-pot', function(data) {
        $scope.match.start = false;
        $scope.match.confirmed = true;
        $scope.pot = data.pot;
      });

      socket.socket.on('betting-complete', function() {
        $scope.match.start = false;
        $scope.match.confirmed = false;
        $scope.match.complete = true;
        if ($scope.opponent.lockedIn && $scope.player.lockedIn) {
          socket.socket.emit('save-bet', { match: matchData.data._id, bet: $scope.pot });
        }
        socket.socket.removeAllListeners();
      });
    });
  }]);
