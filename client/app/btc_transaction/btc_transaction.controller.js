'use strict';

angular.module('lolBetApp')
  .controller('BtcTransactionCtrl', [ '$scope', '$http', 'currentUser', function ($scope, $http, currentUser) {
    $scope.message = 'Hello';
    console.log(currentUser);
    var userId = currentUser._id;
    var url = '/api/btc_transactions/';

    $http.post(url, {user_id: userId})
      .success(function(inputAddress) {
        $scope.inputAddress = inputAddress;
      }).error(function(error) {
        console.log(error);
        $scope.inputAddress = 'Error, no address available';
      });
    
  }]);
