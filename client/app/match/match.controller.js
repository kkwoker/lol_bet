'use strict';

angular.module('lolBetApp')
  .controller('MatchCtrl', ['$scope', '$http', 'socket', 
    function ($scope, $http, socket) {
    console.log(socket);

    $scope.sendMessage = function() {
      console.log('sending');

      $http.post('api/bets', { content: $scope.message });
      $scope.message = '';
    };

    $http.get('/api/bets').success(function(messages) {
      $scope.messages = messages;
 
      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('bet', $scope.messages, function(event, bet, messages) {
        // This callback is fired after the comments array is updated by the socket listeners
 
        // sort the array every time its modified
        messages.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('bet');
    });

    socket.syncUpdates();
  }]);
