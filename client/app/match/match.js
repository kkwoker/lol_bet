'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match', {
        templateUrl: 'app/match/match.html',
        controller: 'MatchCtrl',
        resolve: {
          matchData: function($http, currentMatch) {
            var url = '/api/matches/' + currentMatch.getMatch();
            var result = $http.get(url)
              .success(function(data) {
                return data;
              })
              .error(function(response) {
                return response;
            });
            return result;
          }
        }
      });
  });
