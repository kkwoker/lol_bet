'use strict';
angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$timeout','$location', '$interval', 'Auth', 'currentMatch', 
    function ($scope, $http, $timeout, $location, $interval, Auth, currentMatch) {
    $scope.user = {};
    $scope.preferredCurrency = Auth.getCurrentUser().currency

    console.log($scope.preferredCurrency);
    $http.get('/api/btc_exchange/544dba0cdb1b763dc0f20def')
      .success(function(data) {
        $scope.preferredCurrency = Auth.getCurrentUser().currency
        $scope.exchangeRate = data[$scope.preferredCurrency].last;
      });

    $interval(function(){
      $http.get('/api/btc_exchange/544dba0cdb1b763dc0f20def')
        .success(function(data) {
          $scope.exchangeRate = data.USD.last;
        });
    }, 60000);

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
    $scope.matches = [];
    var url = '/api/matches';

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
    }
  ]);
