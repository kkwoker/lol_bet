'use strict';
angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$timeout','$location', 'Auth', 'currentMatch', 
    function ($scope, $http, $timeout, $location, Auth, currentMatch) {
    $scope.user = {};

    Auth.getCurrentUser().$promise
      .then(function(data) {
        // success!
        $scope.user = data;
        $scope.user.bitcoins = $scope.user.wallet / 100000000;
        $scope.user.mBits = $scope.user.wallet / 100000;
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
            currentMatch.setMatch(data._id);
            $location.url('/match');
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

  }])

.controller('RecentMatchesCtrl', ['$scope', '$http',
  function($scope, $http){
    console.log("HELLO");
    $scope.matches = {};
    var url = '/api/matches';

    $http.get(url)
      .success(function(data){
        $scope.team1Champs = data[0].match.teamOne.map(function(val){
          return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + val.champImg;
        })
        $scope.team2Champs = data[0].match.teamTwo.map(function(val){
          return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + val.champImg;
        })
      })
    }
  ])
