'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', 'match',
    function ($scope, match) {
    console.log(match);
    $scope.player = {};
    $scope.opponent = {};
    $scope.player.bet = 0;
    $scope.opponent.bet = 0;
  }]);
