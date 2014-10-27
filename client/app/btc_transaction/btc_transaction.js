'use strict';

angular.module('lolBetApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/btc_transaction', {
        templateUrl: 'app/btc_transaction/btc_transaction.html',
        controller: 'BtcTransactionCtrl',
        authenticate: true,
        resolve: {
          currentUser:['Auth', function(Auth) {
            return Auth.getCurrentUser().$promise;
          }]
        }
      });
  });

