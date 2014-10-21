'use strict';

describe('Controller: SummonerSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('lolBetApp'));

  var SummonerSearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SummonerSearchCtrl = $controller('SummonerSearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
