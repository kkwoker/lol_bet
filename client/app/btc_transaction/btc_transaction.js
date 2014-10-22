'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/btc_transaction', {
        templateUrl: 'app/btc_transaction/btc_transaction.html',
        controller: 'BtcTransactionCtrl',
        resolve: {
          bitcoinAddress:['$http', 'Auth', function($http, Auth) {
            // console.log(Auth.getCurrentUser());
            var user = Auth.getCurrentUser().$promise.then(function(data) {
              var url = '/api/btc_transactions/';
              $http.post(url, {user_id: data._id}).success(function(info) {
                console.log(info);
              }).error(function(error) {
                console.log(error);
              });
            });

          }]
        }
      });
  });

