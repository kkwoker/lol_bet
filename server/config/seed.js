/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var mongoose = require('mongoose');
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
_id: "1602950344",
match: {
teamTwo: [
{
summoner: {
league: "CHALLENGER",
teamId: "teamTwo",
revisionDate: 1414178639000,
summonerLevel: 30,
profileIconId: 668,
name: "coL kez",
id: 30783632
},
champImg: "Pantheon.png",
name: "colkez"
},
{
summoner: {
league: "CHALLENGER",
teamId: "teamTwo",
revisionDate: 1414137929000,
summonerLevel: 30,
profileIconId: 668,
name: "coL Westrice",
id: 19674238
},
champImg: "Maokai.png",
name: "colwestrice"
},
{
summoner: {
league: "DIAMOND",
teamId: "teamTwo",
revisionDate: 1414178639000,
summonerLevel: 30,
profileIconId: 9,
name: "Is Dat Lohpally",
id: 21911338
},
champImg: "Sona.png",
name: "isdatlohpally"
},
{
summoner: {
league: "CHALLENGER",
teamId: "teamTwo",
revisionDate: 1414178430000,
summonerLevel: 30,
profileIconId: 591,
name: "goldenglue",
id: 21490433
},
champImg: "Jayce.png",
name: "goldenglue"
},
{
summoner: {
league: "DIAMOND",
teamId: "teamTwo",
revisionDate: 1414179221000,
summonerLevel: 30,
profileIconId: 709,
name: "LinkinParkFan53",
id: 22416752
},
champImg: "Corki.png",
name: "linkinparkfan53"
}
],
teamOne: [
{
summoner: {
league: "MASTER",
teamId: "teamOne",
revisionDate: 1414179470000,
summonerLevel: 30,
profileIconId: 709,
name: "Gleebglarbu",
id: 19440665
},
champImg: "Nami.png",
name: "gleebglarbu"
},
{
summoner: {
league: "CHALLENGER",
teamId: "teamOne",
revisionDate: 1414179383000,
summonerLevel: 30,
profileIconId: 557,
name: "NintendudeX",
id: 74673
},
champImg: "LeeSin.png",
name: "nintendudex"
},
{
summoner: {
league: "CHALLENGER",
teamId: "teamOne",
revisionDate: 1414179383000,
summonerLevel: 30,
profileIconId: 9,
name: "zorotonsoh",
id: 21622356
},
champImg: "Lucian.png",
name: "zorotonsoh"
},
{
summoner: {
league: "MASTER",
teamId: "teamOne",
revisionDate: 1414179383000,
summonerLevel: 30,
profileIconId: 557,
name: "Fusion Sin",
id: 29228409
},
champImg: "Irelia.png",
name: "fusionsin"
},
{
summoner: {
league: "MASTER",
teamId: "teamOne",
revisionDate: 1414179383000,
summonerLevel: 30,
profileIconId: 682,
name: "Fusion Chunky",
id: 28039649
},
champImg: "Syndra.png",
name: "fusionchunky"
}
]
},
bet: {
bet: 0,
playerArr: [
{
goldenglue: {
league: "CHALLENGER",
teamId: "teamTwo",
revisionDate: 1414178430000,
summonerLevel: 30,
profileIconId: 591,
name: "goldenglue",
id: 21490433
}
},
null
]
},
active: true
},{
    __v: 0,
    _id: new mongoose.Types.ObjectId,
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
    champImg: "Xerath.png",
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
    champImg: "Lucian.png",
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
    champImg: "Udyr.png",
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
    champImg: "Thresh.png",
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
    champImg: "Teemo.png",
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
    champImg: "Khazix.png",
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
    champImg: "Gnar.png",
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
    champImg: "Sona.png",
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
    champImg: "Ryze.png",
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
    champImg: "Ezreal.png",
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
    },
    {
_id: "1600602919",
match: {
teamOne: [
{
name: "dmitriya",
champImg: "Ahri.png",
summoner: {
id: 45459632,
name: "Dmitriy A",
profileIconId: 27,
summonerLevel: 30,
revisionDate: 1414099243000,
teamId: "teamOne",
league: "MASTER"
}
},
{
name: "tritan",
champImg: "Lucian.png",
summoner: {
id: 30079,
name: "Tritan",
profileIconId: 22,
summonerLevel: 30,
revisionDate: 1414098296000,
teamId: "teamOne",
league: "MASTER"
}
},
{
name: "darkblight",
champImg: "FiddleSticks.png",
summoner: {
id: 20924085,
name: "DarkBlight",
profileIconId: 505,
summonerLevel: 30,
revisionDate: 1414098437000,
teamId: "teamOne",
league: "MASTER"
}
},
{
name: "quasmire",
champImg: "Morgana.png",
summoner: {
id: 50759302,
name: "Quasmire",
profileIconId: 607,
summonerLevel: 30,
revisionDate: 1414098296000,
teamId: "teamOne",
league: "MASTER"
}
},
{
name: "dyrus",
champImg: "Singed.png",
summoner: {
id: 5908,
name: "Dyrus",
profileIconId: 627,
summonerLevel: 30,
revisionDate: 1414098769000,
teamId: "teamOne",
league: "DIAMOND"
}
}
],
teamTwo: [
{
name: "neonsurge",
champImg: "LeeSin.png",
summoner: {
id: 34411039,
name: "NeonSurge",
profileIconId: 585,
summonerLevel: 30,
revisionDate: 1414098769000,
teamId: "teamTwo",
league: "MASTER"
}
},
{
name: "cris",
champImg: "Irelia.png",
summoner: {
id: 21367804,
name: "Cris",
profileIconId: 7,
summonerLevel: 30,
revisionDate: 1413582627000,
teamId: "teamTwo",
league: "MASTER"
}
},
{
name: "cloudnguyen",
champImg: "Ryze.png",
summoner: {
id: 30871780,
name: "CloudNguyen",
profileIconId: 523,
summonerLevel: 30,
revisionDate: 1414098769000,
teamId: "teamTwo",
league: "MASTER"
}
},
{
name: "jakehoffmann",
champImg: "Janna.png",
summoner: {
id: 24153216,
name: "jakehoffmann",
profileIconId: 6,
summonerLevel: 30,
revisionDate: 1414098141000,
teamId: "teamTwo",
league: "MASTER"
}
},
{
name: "neryth",
champImg: "MissFortune.png",
summoner: {
id: 19804152,
name: "Neryth",
profileIconId: 12,
summonerLevel: 30,
revisionDate: 1414099243000,
teamId: "teamTwo",
league: "MASTER"
}
}
]
},
bet: {
playerArr: [
{
dyrus: {
id: 5908,
name: "Dyrus",
profileIconId: 627,
summonerLevel: 30,
revisionDate: 1414098769000,
teamId: "teamOne",
league: "DIAMOND"
}
},
null
],
bet: 0
},
active: false,
__v: 0,
winner: "teamOne"
})

});




User.find({}).remove(function() {
  User.create({
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
      },
    wallet: 140000000
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
}, 

{
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
  },
  wallet: 102015000

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

