'use strict';

angular.module('lolBetApp')
  .controller('BtcTransactionCtrl', [ '$scope', '$http', 'currentUser', function ($scope, $http, currentUser) {

    var userId = currentUser._id;
    var url = '/api/btc_transactions/';
    $scope.requestSuccess = false;

    $http.post(url, {user_id: userId})
      .success(function(inputAddress) {
        $scope.inputAddress = inputAddress;
      }).error(function(error) {
        console.log(error);
        $scope.inputAddress = 'Error, no address available';
      });
    
    $scope.requestWithdrawal = function(user){

      $http.post('api/mailer/', {userId : userId, btcAddress: user.btcAddress, 
        withdrawValue: user.withdrawValue, sentOn: Date()})
      .success(function(data, status, headers, config){
        console.log(status);
        $scope.requestSuccess = true;
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      })
    };
    

  }]);
