'use strict';

angular.module('lolBetApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeCurrency = function(form) {
      $scope.userId = Auth.getCurrentUser()._id;
      $http.post('/api/users/' + $scope.userId + '/currency', {newCurrency: $scope.newCurrency, user_id: $scope.userId });
    };

  });
