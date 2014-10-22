'use strict';


angular.module('lolBetApp')
  .controller('SummonerSearchCtrl', ['$scope', '$http', '$location', 'Auth', 'Pagination',
    function ($scope, $http, $location, Auth, Pagination) {
    $scope.message = 'Hello';
    $scope.user = [];
    $scope.user_object = [];
    $scope.user_count = [];
    $scope.pagination = Pagination.getNew(3);
    $scope.pageCount = pageCount;
    $scope.summoners;
    $scope.appsState = "godbye";
  

  $http.get('/api/users')
      .success(function(data){
    for (var i = 0; i < data.length; i++ ) {
      if (data[i]['summoner']) {
        $scope.user_count = i;
        $scope.user_object.push( { "name": data[i]['summoner']['name'], "profile_icon_id": data[i]['summoner']['profileIconId'], "summoner_level": data[i]['summoner']['summonerLevel'] } );
      }
    }
    pageCount($scope.user_count);
      }).error(function(data) {
          console.log(data);
        });

    function pageCount (summonerCount) { 
      $scope.pagination.numPages = Math.ceil(summonerCount/$scope.pagination.perPage);
    }

    $scope.typeOptions = [
      { name: 'Name', value: 'name' }, 
      { name: 'Profile Id', value: 'profile_icon_id'} ,
      { name: 'Summoner Level', value: 'summoner_level' }
    ];

 


}]);

  angular.module('lolBetApp')
    .controller('SummonerDetailCtrl', ['$scope', '$location','$routeParams', '$http', '$log', 'Auth', 
    function ($scope, $routeParams, $log, $http, $location, Auth) {
      $scope.show_summoner = [];
      $scope.the_summoner_id = "";
      $scope.summoner_view = [];
      $scope.online = "offline";


  var id = window.location.href.replace(/\D+/g, '' ); 
   var res = id.split("");
    if ( res[0] && res[1] && res[2] && res[3] ) {
      var localPort = res[0]+res[1]+res[2]+res[3];
      for (var x = 4; x < id.length; x++ ) {
        $scope.the_summoner_id  += id[x];
      }
    };


  $http.get('/api/users')
    .success(function(data){
      for (var y = 0; y < data.length; y++ ) {
        if (data[y]['summoner']) {
          if(data[y]['summoner']['profileIconId'] == $scope.the_summoner_id) {
            console.log(data[y]['summoner']['indexName']);
            $http.get('/api/matches/search/'+data[y]['summoner']['indexName'])
              .success(function(data){
              $scope.online = "online";
                }).error(function(data) {
              console.log(data);
              });
            $scope.summoner_view.push( { "name": data[y]['summoner']['name'], "profile_icon_id": data[y]['summoner']['profileIconId'], "summoner_level": data[y]['summoner']['summonerLevel'] } );
            }
          }
       };
    });  
}]);






