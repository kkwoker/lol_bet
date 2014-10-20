'use strict';

angular.module('lolBetApp')
  .controller('SummonerSearchCtrl', ['$scope', '$http', '$location', 'Auth', 
    function ($scope, $http, $location, Auth) {
    $scope.message = 'Hello';
    $scope.user = [];
    $scope.user_object = [];
   
    $http.get('/api/users')
      .success(function(data){
        for (var i = 0; i < data.length; i++ ) {
          if (data[i]['summoner']) {
            $scope.user_object.push( { "name": data[i]['summoner']['name'], "profile_icon_id": data[i]['summoner']['profileIconId'], "summoner_level": data[i]['summoner']['summonerLevel'] } );
          }
        };

        $scope.typeOptions = [
      { name: 'Name', value: 'name' }, 
      { name: 'Profile Id', value: 'profile_icon_id'} ,
      { name: 'Summoner Level', value: 'summoner_level' }
    ];

      console.log($scope.user_object);
        for (var y = 0; y < $scope.user.length; y++){
          console.log($scope.user[y]);
        }
        }).error(function(data) {
          console.log(data);
        });
}]);

    






