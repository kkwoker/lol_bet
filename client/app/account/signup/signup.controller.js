'use strict';

angular.module('lolBetApp')
  .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', 
    function ($scope, $http, $location, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.checkSummoner = function() {
      console.log($scope.user.summonerName);
      $http.get('/api/summoners/' + $scope.user.summonerName
      ).success(function(data) {
        $scope.errors.invalidSummoner = false;
        $scope.greenlight = true;
        $('.help-block').addClass('greenlight');
        console.log(data);
      }).error(function() {
        $scope.errors.invalidSummoner = true;
        $scope.greenlight = false;
        $('.help-block').removeClass('greenlight');
        console.log($scope.errors);
      });
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          summoner: { name: $scope.user.summonerName },
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/home');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
}]);


