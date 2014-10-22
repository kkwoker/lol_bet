'use strict';

describe('Service: currentMatch', function () {

  // load the service's module
  beforeEach(module('lolBetApp'));

  // instantiate service
  var currentMatch;
  beforeEach(inject(function (_currentMatch_) {
    currentMatch = _currentMatch_;
  }));

  it('should do something', function () {
    expect(!!currentMatch).toBe(true);
  });

});
