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
  Match.create ({
    __v: 0,
    _id: "1593289310",
    match: {
    teamTwo: [
    {
    summoner: {
    revisionDate: 1413833493000,
    summonerLevel: 30,
    profileIconId: 13,
    name: "SpicyTicTac",
    id: 25329778
    },
    champId: 236,
    name: "spicytictac"
    },
    {
    summoner: {
    revisionDate: 1413833493000,
    summonerLevel: 30,
    profileIconId: 534,
    name: "Man Dinh",
    id: 16685
    },
    champId: 29,
    name: "mandinh"
    },
    {
    summoner: {
    revisionDate: 1413742058000,
    summonerLevel: 30,
    profileIconId: 621,
    name: "Im Novel",
    id: 22089278
    },
    champId: 201,
    name: "imnovel"
    },
    {
    summoner: {
    revisionDate: 1413832916000,
    summonerLevel: 30,
    profileIconId: 585,
    name: "SV Xio",
    id: 25316184
    },
    champId: 150,
    name: "svxio"
    },
    {
    summoner: {
    revisionDate: 1413833217000,
    summonerLevel: 30,
    profileIconId: 599,
    name: "KTCure",
    id: 19055228
    },
    champId: 61,
    name: "ktcure"
    }
    ],
    teamOne: [
    {
    summoner: {
    revisionDate: 1413833352000,
    summonerLevel: 30,
    profileIconId: 17,
    name: "THE DEMON CHlLD",
    id: 19148345
    },
    champId: 90,
    name: "thedemonchlld"
    },
    {
    summoner: {
    revisionDate: 1413833493000,
    summonerLevel: 30,
    profileIconId: 685,
    name: "Swaggie Daddy",
    id: 22683567
    },
    champId: 68,
    name: "swaggiedaddy"
    },
    {
    summoner: {
    revisionDate: 1413769472000,
    summonerLevel: 30,
    profileIconId: 538,
    name: "1013rian",
    id: 20851060
    },
    champId: 35,
    name: "1013rian"
    },
    {
    summoner: {
    revisionDate: 1413751809000,
    summonerLevel: 30,
    profileIconId: 545,
    name: "AznSneakyFellow ",
    id: 23994633
    },
    champId: 267,
    name: "aznsneakyfellow"
    },
    {
    summoner: {
    revisionDate: 1413781319000,
    summonerLevel: 30,
    profileIconId: 627,
    name: "NÃ¬kÃ³lÃ i",
    id: 37874755
    },
    champId: 42,
    name: "nÃ¬kÃ³lÃ i"
    }
    ]
    },
    bet: {
    bet: 0,
    playerArr:[
      {
      mandinh: {
      league: "MASTER",
      revisionDate: 1413833493000,
      summonerLevel: 30,
      profileIconId: 534,
      name: "Man Dinh",
      id: 16685
      }
      },
      {
      swaggiedaddy: {
      league: "MASTER",
      revisionDate: 1413833493000,
      summonerLevel: 30,
      profileIconId: 685,
      name: "Swaggie Daddy",
      id: 22683567
      }
      }
]
    },
    active: true
    })

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
  }, {
    provider: 'local',
    name: 'Swaggie Daddy',
    email: 'swaggiedaddy@swaggiedaddy',
    password: '1234',
    summoner: {
        id: 22683567,
        indexName: "swaggiedaddy",
        name: "Swaggie Daddy",
        profileIconId: 685,
        summonerLevel: 30,
        revisionDate: 1413833493000
      }
  }, {
    provider: 'local',
    name: 'THE DEMON CHlLD',
    email: 'thedemonchlld@thedemonchlld',
    password: '1234',
    summoner: {
        id: 22683567,
        indexName: "thedemonchlld",
        name: "THE DEMON CHlLD",
        profileIconId: 17,
        summonerLevel: 30,
        revisionDate: 1413833352000
      }
  }, {
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
  name: 'mandinh',
  email: "mandinh@mandinh",
  password: '1234',
  summoner: {
    indexName: "mandinh",
    revisionDate: 1413833493000,
    summonerLevel: 30,
    profileIconId: 534,
    name: "Man Dinh",
    id: 16685
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
},{
  provider: "local",
  email: "imaqtpie@imaqtpie",
  password: "1234",
  summoner: {
    indexName: "imaqtpie",
    revisionDate: 1413841825000,
    summonerLevel: 30,
    profileIconId: 677,
    name: "Imaqtpie",
    id: 19887289
  }
},{
  provider: "local",
  email: "dyrus@dyrus",
  password: "1234",
  summoner: {
    indexName: "dyrus",
    revisionDate: 1413843439000,
    summonerLevel: 30,
    profileIconId: 627,
    name: "Dyrus",
    id: 5908
  }
}, {
  provider: "local",
  email: "zionspartan@zionspartan",
  password: "1234",
  summoner: {
    indexName: "zionspartan",
    revisionDate: 1413843439000,
    summonerLevel: 30,
    profileIconId: 625,
    name: "ZionSpartan",
    id: 19738326
  }
}, {
  provider: "local",
  email: "mandinh@mandinh",
  password: "1234",
  summoner: {
    indexName: "mandinh",
    revisionDate: 1413841323000,
    summonerLevel: 30,
    profileIconId: 534,
    name: "Man Dinh",
    id: 16685
  }
}, {
  provider: "local",
  email: "cytosine@cytosine",
  password: "1234",
  summoner: {
    indexName: "cytosine",
    revisionDate: 1413843404000,
    summonerLevel: 30,
    profileIconId: 512,
    name: "Cytosine",
    id: 22149390
  }
}






,  function() {
      console.log('finished populating users');
    }
  );
});