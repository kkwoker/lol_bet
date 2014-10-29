'use strict';

angular.module('lolBetApp')
  .service('currentMatch', ['$cookieStore', function ($cookieStore) {
    var match;
    return {
      getMatch: function () {
        match = $cookieStore.get('match');
        return match;
      },
      setMatch: function(value) {
        $cookieStore.put('match', value);
      }
    };
  }]);
