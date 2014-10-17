'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match', {
        templateUrl: 'app/match/match.html',
        controller: 'MatchCtrl'
      });
  });
