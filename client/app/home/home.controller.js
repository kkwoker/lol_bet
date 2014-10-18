'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {
    $scope.user = {};
      
    Auth.getCurrentUser().$promise
      .then(function(data) {
        // success!
        $scope.user = data;
        $scope.user.avatarURL = 'https://ddragon.leagueoflegends.com/cdn/4.13.1/img/profileicon/' + $scope.user.summoner.profileIconId + '.png';
      }, function(response) {
        // failure
        console.log(response);
      });

    $scope.searchGames = function() {
      var url = '/matches/search/' + $scope.user.summoner.indexName;
      $scope.loading = true;
      console.log(url);
      $http.get(url)
        .success(function(data) {
          console.log(data);
        })
        .error(function(response, status) {
          console.log(response, status);
        });
    };
  }]);