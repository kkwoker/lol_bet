'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', 'matchData',
    function ($scope, matchData) {
    console.log(matchData);
    $scope.player = {};
    $scope.opponent = {};
    $scope.player.bet = 0;
    $scope.opponent.bet = 0;
  }]);
