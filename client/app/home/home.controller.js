'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.user = Auth.getCurrentUser();

    if ($scope.user.summoner) {
      $scope.user.avatarURL = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + $scope.user.summoner.profileIconId + '.png';
    }
  }]);