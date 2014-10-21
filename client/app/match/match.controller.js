'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', 'matchData', 'currentUser',
    function ($scope, matchData, currentUser) {
    console.log(currentUser);
    console.log(matchData);
    $scope.player = {
      name: currentUser.summoner.indexName,
      bet: 0,
      iconUrl:'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + currentUser.summoner.profileIconId + '.png'
    };
    $scope.opponent = {
      bet: 0
    };

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

    console.log($scope.player);
    console.log($scope.opponent);
  }]);
