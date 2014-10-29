'use strict';

angular.module('lolBetApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.redirectHome = function(){
      if(Auth.isLoggedIn()){
        $location.path('/home');
      }
    }
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/home');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
