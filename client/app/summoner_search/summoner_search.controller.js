'use strict';

angular.module('lolBetApp')
  .controller('SummonerSearchCtrl', ['$scope', '$http', '$location', '$route', 'Auth', 'Pagination',
    function ($scope, $http, $location, $route, Auth, Pagination) {
    $scope.user = [];
    $scope.userObject = [];
    $scope.userCount = [];
    $scope.pagination = Pagination.getNew(4);
    $scope.summonerStats = [];
    $scope.route = $route;
   
    
    $http.get('/api/users')
      .success(function(data){
    for (var i = 0; i < data.length; i++ ) {
      if (data[i].summoner) {
        $scope.userCount = i;
        $scope.userObject.push( { 'name': data[i].summoner.name, 'profile_icon_id': data[i].summoner.profileIconId, 
          'summoner_level': data[i].summoner.summonerLevel, 'indexName': data[i].summoner.indexName, 'id': data[i].summoner.id } );
      }
    }
    pageCount($scope.userCount);
      }).error(function(data) {
          console.log(data);
        });

    function pageCount (summonerCount) { 
      $scope.pagination.numPages = Math.ceil(summonerCount/$scope.pagination.perPage);
    }
    $scope.pageCount = pageCount;

    function listSummoners() {
      $scope.hideSearch = 'true';
      $scope.pagination = Pagination.getNew($scope.userCount);
    }
    $scope.listSummoners = listSummoners;

    $scope.$watch('sm_name', function(sName){
      $scope.summonerName = sName;
      if ( ($scope.unregisteredSummonerFound === 'yes' && sName.length === 0) || ($scope.noSummoner) || ($scope.characterName !== sName) ){
        $scope.emptyUser();
        $scope.cantFind = 'false';
        $scope.unregisteredSummonerFound = '';
      }
    });

    function emptyUser() {
      $scope.user = [];
      $scope.summonerStats = [];
      $scope.foundStats = 'false';
      $scope.noSummoner = '';
    }
    $scope.emptyUser = emptyUser;

    function checkSummoner(summoner) {
      $scope.cantFind = 'true';
      var url = '/api/summoners/'+summoner;
      $http.get(url)
      .success(function(data){
        displayStats(data[summoner].id);
        $scope.unregisteredSummonerFound = 'yes';
        for (var i in data) {
          console.log(data[i].id);
          $scope.user.push({ 'name': data[i].name, 'profile_icon_id': data[i].profileIconId, 'summoner_level': data[i].summonerLevel, 'indexName': data[i].indexName });
        }
      }).error(function(data){
        console.log(data);
        $scope.noSummoner = $scope.summonerName+ ' does not have a League of Legends Summoner.';

      });
    }
    $scope.checkSummoner = checkSummoner;

    function displayStats(id) {
      $http.get('/api/stats/'+id)
      .success(function(data){
        for (var i = 0; i < data.champions.length; i++) {
          if( data.champions[i].id === 0) {
            $scope.characterName = $scope.summonerName;
            $scope.foundStats='true';
            console.log(data.champions[i]);
            $scope.summonerStats.push({'champions_killed': data.champions[i].stats.mostChampionKillsPerSession, 'total_sessions_played': data.champions[i].stats.totalSessionsPlayed,
            'max_num_deaths': data.champions[i].stats.maxNumDeaths, 'total_sessions_won': data.champions[i].stats.totalSessionsWon, 'total_sessions_lost': data.champions[i].stats.totalSessionsLost,
            'max_killing_spree': data.champions[i].stats.maxLargestKillingSpree, 'total_damage_dealt': data.champions[i].stats.totalDamageDealt, 'total_damage_taken': data.champions[i].stats.totalDamageTaken,
            'total_minions_killed': data.champions[i].stats.totalMinionKills });
          }
        }
       }).error(function(data) {
        console.log(data);
      });
    }
    $scope.displayStats = displayStats;
}]);

angular.module('lolBetApp')
  .controller('SummonerDetailCtrl', ['$scope','$routeParams', '$location', '$log', '$http', 
  function ($scope, $routeParams, $location, $log, $http) {
    $scope.theSummonerId = '';
    $scope.summonerView = [];
    $scope.online = 'offline';
    $scope.summonerSearch = 'search';
    $scope.summonerDetails = [];
    $scope.summonerStats = [];
    $scope.summonerAggregatedStats = [];
    $scope.AramUnranked5x5 = [];
    $scope.CoopVsAI = [];
    $scope.CAP5x5 = [];
    $scope.CoopVsAI3x3 = [];
    $scope.NightmareBot = [];
    $scope.OdinUnranked = [];
    $scope.OneForAll5x5 = [];
   $scope.RankedSolo5x5 = [];


    // ranked stats
    $http.get('/api/stats/'+$routeParams.param2)
      .success(function(data){
        for (var i = 0; i < data.champions.length; i++) {


          if( data.champions[i].id === 0) {
            $scope.foundStats='true';
            console.log(data.champions[i]);
            $scope.summonerStats.push({'champions_killed': data.champions[i].stats.mostChampionKillsPerSession, 'total_sessions_played': data.champions[i].stats.totalSessionsPlayed,
            'max_num_deaths': data.champions[i].stats.maxNumDeaths, 'total_sessions_won': data.champions[i].stats.totalSessionsWon, 'total_sessions_lost': data.champions[i].stats.totalSessionsLost,
            'max_killing_spree': data.champions[i].stats.maxLargestKillingSpree, 'total_damage_dealt': data.champions[i].stats.totalDamageDealt, 'total_damage_taken': data.champions[i].stats.totalDamageTaken,
            'total_minions_killed': data.champions[i].stats.totalMinionKills });

          }
        }
       }).error(function(data) {
        console.log(data);
      });

      $http.get('/api/users')
       .success(function(data){
      var result = $.grep(data, function(e){ return e.summoner !== null && e.summoner.indexName === $routeParams.param1; });
      $scope.summonerDetails.push({'name': result[0].summoner.name, 'profile_icon_id': result[0].summoner.profileIconId, 'summoner_level': result[0].summoner.summonerLevel, 'id': result[0].summoner.id});
      $scope.image = result[0].summoner.profileIconId;
      $scope.userName = result[0].summoner.name;
    }).error(function(data) {
      console.log(data);
    });


      // aggregated stats
      $http.get('/api/summarys/'+$routeParams.param2)
        .success(function(data){
          var AramUnranked5x5 = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'AramUnranked5x5' }); 
          jQuery.isEmptyObject(AramUnranked5x5) ? $scope.AramUnranked5x5.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.AramUnranked5x5.push({'wins': AramUnranked5x5[0].wins, 'aggregatedStats': AramUnranked5x5[0].aggregatedStats });
          var CoopVsAI = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'CoopVsAI' }); 
          jQuery.isEmptyObject(CoopVsAI) ? $scope.CoopVsAI.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.CoopVsAI.push({'wins': CoopVsAI[0].wins, 'aggregatedStats': CoopVsAI[0].aggregatedStats });
          var CAP5x5 = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'CAP5x5' }); 
          jQuery.isEmptyObject(CAP5x5) ? $scope.CAP5x5.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.CAP5x5.push({'wins': CAP5x5[0].wins, 'aggregatedStats': CAP5x5[0].aggregatedStats }); 
          var CoopVsAI3x3 = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'CoopVsAI3x3' }); 
          jQuery.isEmptyObject(CoopVsAI3x3) ? $scope.CoopVsAI3x3.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.CoopVsAI3x3.push({'wins': CoopVsAI3x3[0].wins, 'aggregatedStats': CoopVsAI3x3[0].aggregatedStats });
          var NightmareBot = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'NightmareBot' }); 
          jQuery.isEmptyObject(NightmareBot) ? $scope.NightmareBot.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.NightmareBot.push({'wins': NightmareBot[0].wins, 'aggregatedStats': NightmareBot[0].aggregatedStats });
          var OdinUnranked = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'OdinUnranked' }); 
          jQuery.isEmptyObject(OdinUnranked) ? $scope.OdinUnranked.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.OdinUnranked.push({'wins': OdinUnranked[0].wins, 'aggregatedStats': OdinUnranked[0].aggregatedStats });
          var OneForAll5x5 = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'OneForAll5x5' }); 
          jQuery.isEmptyObject(OneForAll5x5) ? $scope.OneForAll5x5.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.OneForAll5x5.push({'wins': OneForAll5x5[0].wins, 'aggregatedStats': OneForAll5x5[0].aggregatedStats });
          var RankedSolo5x5 = $.grep(data.playerStatSummaries, function(e){ return e.playerStatSummaryType === 'RankedSolo5x5' }); 
          jQuery.isEmptyObject(RankedSolo5x5) ? $scope.RankedSolo5x5.push({'wins': 'No stats available for this summary type', 'Aggregated Stats': {'Aggregated Stats': 'NA'} }) : $scope.RankedSolo5x5.push({'wins': RankedSolo5x5[0].wins, 'aggregatedStats': RankedSolo5x5[0].aggregatedStats });
        }).error(function(data){
          console.log(data);
  });


    $http.get('/api/matches/search/'+$routeParams.param1)
      .success(function(data){
        $scope.online = "online";
      }).error(function(data) {
        console.log(data);
      });



}]);