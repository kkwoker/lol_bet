'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$interval', 'Auth', 
    function ($scope, $http, $interval, Auth) {
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
      var url = '/api/matches/search/' + $scope.user.summoner.indexName;
      var timer;
      var stopTime;
      var success;

      $scope.loading = true;
      
      $scope.getGame(url, success);

      timer = $interval(function() {
        $scope.getGame(url, success);
      }, 5000);

      success = function(data) {
        stopTime();
        console.log(data);
      };

      stopTime = function() {
        $interval.cancel(timer);
        $scope.loading=false;
      };

      $(document).on('keyup', function(event) {
        if (event.keyCode === 27) { 
         stopTime();
        }
      });
    };

    $scope.getGame = function(url, cb) {
      $http.get(url)
        .success(function(data) {
          cb(data);
        })
        .error(function(response, status) {
          console.log(response, status);
      });
    };
  }]);