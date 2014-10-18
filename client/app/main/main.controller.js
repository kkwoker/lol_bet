'use strict';

angular.module('lolBetApp')
  .controller('MainCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    
    $scope.loggedIn = Auth.isLoggedIn();

  }]);
