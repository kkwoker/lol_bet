'use strict';

angular.module('lolBetApp')
  .controller('BtcTransactionCtrl', [ '$scope', 'bitcoinAddress', function ($scope, bitcoinAddress) {
    $scope.message = 'Hello';
    $scope.btcadd = bitcoinAddress;
    
  }]);
