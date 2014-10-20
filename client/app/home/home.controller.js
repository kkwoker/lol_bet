'use strict';

angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$timeout','$location', 'Auth', 
    function ($scope, $http, $timeout, $location, Auth) {
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
        if (!$scope.loading) { return false; }

        $http.get(url)
          .success(function(data) {
            $scope.loading = false;
            $location.url('/match?m=' + data._id);
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
         $scope.loading = false;
        }
      });

      getGame();
    };

  }]);