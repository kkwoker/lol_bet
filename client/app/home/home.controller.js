'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$timeout', 'Auth', 
    function ($scope, $http, $timeout, Auth) {
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

      $scope.loading = true;

      function getGame() {
        $http.get(url)
          .success(function(data) {
            $scope.loading = false;
            console.log(data);
          })
          .error(function(response, status) {
           $timeout(function() {
              getGame();
            }, 5000);

            console.log(response, status);
        });
      }

      $(document).on('keyup', function(event) {
        if (event.keyCode === 27) { 
         return false;
        }
      });

      getGame();
    };

  }]);