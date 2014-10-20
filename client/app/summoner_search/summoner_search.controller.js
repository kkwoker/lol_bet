'use strict';

angular.module('lolBetApp')
  .controller('SummonerSearchCtrl', ['$scope', '$http', '$location', 'Auth', 
    function ($scope, $http, $location, Auth) {
    $scope.message = 'Hello';
    $scope.user = [];
   
     $http.get('/api/users')
      .success(function(data){

        for (var i = 0; i < data.length; i++ ) {
          if (data[i]['summoner']) {

            $scope.user.push([ data[i]['summoner']['name'], data[i]['summoner']['profileIconId'], data[i]['summoner']['summonerLevel'], data[i]['email']]);
          }
        }
        for (var y = 0; y < $scope.user.length; y++){
          console.log($scope.user[y]);
        }
        
    
      }).error(function(data) {
        console.log(data);
      });
       }]);


