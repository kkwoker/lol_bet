'use strict';

describe('Controller: BtcTransactionCtrl', function () {

  // load the controller's module
  beforeEach(module('lolBetApp'));

  var BtcTransactionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BtcTransactionCtrl = $controller('BtcTransactionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
