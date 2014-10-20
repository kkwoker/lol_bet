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
  provider: "local",
  name: 'Chaox',
  email: "chaox@chaox",
  password: '1234',
  summoner: {
    indexName: "chaox",
    revisionDate: 1413755370000,
    summonerLevel: 30,
    profileIconId: 693,
    name: "Chaox",
    id: 7460
  }
}, {
  provider: "local",
  email: "pounder@pounder",
  password: "1234",
  summoner: {
    indexName: "butttpounder",
    revisionDate: 1413755312000,
    summonerLevel: 30,
    profileIconId: 23,
    name: "butttpounder",
    id: 23850925
  }
}, {
  provider: "local",
  email: "fexir@fexir",
  password: "1234",
  summoner: {
    indexName: "fexir",
    revisionDate: 1413760658000,
    summonerLevel: 30,
    profileIconId: 28,
    name: "Fexir",
    id: 22344323
  }
}, {
  provider: "local",
  email: "mandatorycloud@man",
  password: "1234",
  summoner: {
    indexName: "mandatorycloud",
    revisionDate: 1413762747000,
    summonerLevel: 30,
    profileIconId: 687,
    name: "mandatorycloud",
    id: 200553
  }
},{
  provider: "local",
  email: "slooshi@sloosh",
  password: "1234",
  summoner: {
    indexName: "slooshi8",
    revisionDate: 1413762747000,
    summonerLevel: 30,
    profileIconId: 7,
    name: "Slooshi8",
    id: 20024304
  }
},{
  provider: "local",
  email: "phantom@phantom",
  password: "1234",
  summoner: {
    indexName: "phantoml0rd",
    revisionDate: 1413823646000,
    summonerLevel: 30,
    profileIconId: 586,
    name: "PhantomL0rd",
    id: 19347723
  }
},{
  provider: "local",
  email: "diskon@diskon",
  password: "1234",
  summoner: {
    indexName: "diskon",
    revisionDate: 1413836870000,
    summonerLevel: 30,
    profileIconId: 604,
    name: "Diskon",
    id: 22063890
  }
}



,  function() {
      console.log('finished populating users');
    }
  );
});