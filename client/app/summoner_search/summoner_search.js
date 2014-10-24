'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/summoner_search', {
        templateUrl: 'app/summoner_search/summoner_search.html',
        controller: 'SummonerSearchCtrl'
      }).  
      when('/summoner_search/:param1', {
            templateUrl: 'app/summoner_search/summoner_search.html',
            controller: 'SummonerDetailCtrl'
  });
    });

  // $routeProvider.when('/backend/:type/:id', {






 
