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
        $scope.user.avatarURL = 'https://ddragon.leagueoflegends.com/cdn/4.18.1/img/profileicon/' + $scope.user.summoner.profileIconId + '.png';
        $scope.matches = recentMatches();
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
            if (!data._id) {
              $timeout(function() {
                if ($scope.loading) { getGame(); }
              }, 2000);
            }
            $scope.loading = false;
            currentMatch.setMatch(data._id);
            $location.url('/match');
          })
          .error(function(response, status) {
            console.log(response, status);
            $timeout(function() {
              if ($scope.loading) { getGame(); }
            }, 5000);
        });

      }

      getGame();
    };
    function recentMatches(){
      $scope.matches = [];
      var url = '/api/matches/summoner/' + $scope.user.summoner.indexName;
      $http.get(url)
        .success(function(data){

          for(var i in data){
            $scope.matches[i] = {};
            $scope.matches[i].team1Champs = data[i].match.teamOne.map(function(val){
              // return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + val.champImg;
              return val.champImg;
            });
            $scope.matches[i].team2Champs = data[i].match.teamTwo.map(function(val){
              // return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + val.champImg;
              return val.champImg;

            });
            $scope.matches[i].winner = data[i].winner;

          }
        });
        return $scope.matches.reverse();
      }


  }])

