'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.user = {};
      
    Auth.getCurrentUser().$promise
      .then(function(data) {
        $scope.user = data;
        $scope.user.avatarURL = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + $scope.user.summoner.profileIconId + '.png';
      })
      .catch(function(response, status) {
        console.log(response, status);
    });

    $scope.searchGames = function() {
      console.log($scope.user.summoner.indexName);
    };
  }]);