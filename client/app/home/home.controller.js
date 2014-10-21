'use strict';
angular.module('lolBetApp')
  .controller('HomeCtrl', ['$scope', '$http', '$timeout','$location', 'Auth', 'currentMatch', 
    function ($scope, $http, $timeout, $location, Auth, currentMatch) {
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
        console.log(data);
        // var n = _.map(data[0]. function(num){
        //   return num.match.teamOne
        // })
        var champids1 = data[0].match.teamOne.map(function(val){
          return val.champId;
        })
        var champids2 = data[0].match.teamTwo.map(function(val){
          return val.champId;
        })

        var champUrl = '/api/champions';
        $http.get(champUrl)
          .success(function(data){
            var champs = data[0].data;
            var team1ChampImages = [];
            var team2ChampImages = [];
            console.log(champs);
            angular.forEach(champids1, function(id){
              angular.forEach(champs, function(value, key){
                if(id == value.id){
                  team1ChampImages.push(value.image.full)
                }
              })
            })
            console.log(team1ChampImages);
            angular.forEach(champids2, function(id){
              angular.forEach(champs, function(value, key){
                if(id == value.id){
                  team2ChampImages.push(value.image.full)
                }
              })
            })
            console.log(team2ChampImages);
            team1ChampImages = team1ChampImages.map(function(image){
              return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + image;
            })
            team2ChampImages = team2ChampImages.map(function(image){
              return 'http://ddragon.leagueoflegends.com/cdn/4.18.1/img/champion/' + image; 
            })
            $scope.team1Champs = team1ChampImages;
            $scope.team2Champs = team2ChampImages;
          })
      })
      .error(function(response, status){
        console.log(status, response);
      });
    
  }
  ])