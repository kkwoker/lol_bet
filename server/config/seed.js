/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Match = require('../api/match/match.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Match.find({}).remove(function() {
});




User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    
  },{
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'kkwoker@admin.com',
    password: 'admin',
    summoner: {
        id: 23859411,
        indexName: "herpofthederp",
        name: "HERPoftheDERP",
        profileIconId: 662,
        summonerLevel: 30,
        revisionDate: 1411327378000
      }
  },{
    provider: 'local',
    name: 'Eric',
    email: 'eric@eric.com',
    password: '1234',
    summoner: {
        id: 20800354,
        indexName: "eufo",
        name: "Eufo",
        profileIconId: 692,
        summonerLevel: 30,
        revisionDate: 1413534892000
      }
  }
  , {
    provider: 'local',
    name: 'Marlon',
    email: 'marlon@marlon.com',
    password: '1234',
    summoner: {
      id: 61353331,
      name: "LOL BET",
      profileIconId: 23,
      summonerLevel: 2,
      revisionDate: 1413615915000
    }
  }

  , function() {
      console.log('finished populating users');
    }
  );
});