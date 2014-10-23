'use strict';

angular.module('lolBetApp')
  .controller('SummonerSearchCtrl', ['$scope', '$http', '$location', 'Auth', 'Pagination',
    function ($scope, $http, $location, Auth, Pagination) {
    $scope.user = [];
    $scope.userObject = [];
    $scope.userCount = [];
    $scope.pagination = Pagination.getNew(5);
    $scope.pageCount = pageCount;
    $scope.searchSummoner = searchSummoner;

    $http.get('/api/users')
      .success(function(data){
    for (var i = 0; i < data.length; i++ ) {
      if (data[i].summoner) {
        $scope.userCount = i;
        $scope.userObject.push( { "name": data[i].summoner.name, "profile_icon_id": data[i].summoner.profileIconId, "summoner_level": data[i].summoner.summonerLevel, "indexName": data[i].summoner.indexName } );
      }
    }
    pageCount($scope.userCount);
      }).error(function(data) {
          console.log(data);
        });

    function pageCount (summonerCount) { 
      $scope.pagination.numPages = Math.ceil(summonerCount/$scope.pagination.perPage);
    }

    function searchSummoner() {
      $scope.hideSearch = 'true';
      $scope.pagination = Pagination.getNew($scope.userCount);
    }

 }]);

angular.module('lolBetApp')
  .controller('SummonerDetailCtrl', ['$scope','$routeParams', '$location', '$log', '$http', '$rootScope', 'Auth',
  function ($scope, $routeParams, $location, $log, $http, $rootScope, Auth) {
    $scope.theSummonerId = "";
    $scope.summonerView = [];
    $scope.online = "offline";
    $scope.summonerSearch = 'search';
    $scope.summonerDetails = [];

    $http.get('/api/matches/search/'+$routeParams.param1)
            .success(function(data){
              $scope.online = "online";
              }).error(function(data) {
            console.log(data);
            });

    $http.get('/api/users')
            .success(function(data){
              var result = $.grep(data, function(e){ return e.summoner != null && e.summoner.indexName == $routeParams.param1; });
              $scope.summonerDetails.push({"name": result[0].summoner.name, "profile_icon_id": result[0].summoner.profileIconId, "summoner_level": result[0].summoner.summonerLevel});
             }).error(function(data) {
            console.log(data);
            });

}]);






