'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match', {
        templateUrl: 'app/match/match.html',
        controller: 'MatchCtrl',
        authenticate: true,
        resolve: {
          matchData: function($http, $location, currentMatch) {
            var match = currentMatch.getMatch();
            if (!match) { $location.url('/home'); }
            var url = '/api/matches/' + match;
            var result = $http.get(url)
              .success(function(data) {
                return data;
              })
              .error(function(response) {
                return response;
            });
            return result;
          },
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      });
  });
