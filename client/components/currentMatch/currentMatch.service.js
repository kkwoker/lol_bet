'use strict';

angular.module('lolBetApp')
  .service('currentMatch', ['$cookieStore', function ($cookieStore) {
    var match = $cookieStore.get('match') || '';
    return {
      getMatch: function () {
        return match;
      },
      setMatch: function(value) {
        $cookieStore.put('match', value);
        match = value;
      }
    };
  }]);
