'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.user = Auth.getCurrentUser();

    $scope.user.$promise.then(function() {
      $scope.user.avatarURL = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + $scope.user.summoner.profileIconId + '.png';
    });
  }]);