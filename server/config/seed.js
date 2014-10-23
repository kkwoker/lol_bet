/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Match = require('../api/match/match.model');
var Champion = require('../api/champion/champion.model');





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
    champImg: "Ahri.png",
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
    champImg: "FiddleSticks.png",
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
    champImg: "Morgana.png",
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
    champImg: "Singed.png",
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
    champImg: "LeeSin.png",
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
    champImg: "Irelia.png",
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
    champImg: "Janna.png",
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
    champImg: "MissFortune.png",
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



// Champion.find({}).remove(function(){
//   Champion.create({
// type: "champion",
// version: "4.18.1",
// data: {
// Aatrox: {
// id: 266,
// key: "Aatrox",
// name: "Aatrox",
// title: "the Darkin Blade",
// image: {
// full: "Aatrox.png",
// sprite: "champion0.png",
// group: "champion",
// x: 0,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Thresh: {
// id: 412,
// key: "Thresh",
// name: "Thresh",
// title: "the Chain Warden",
// image: {
// full: "Thresh.png",
// sprite: "champion3.png",
// group: "champion",
// x: 240,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Tryndamere: {
// id: 23,
// key: "Tryndamere",
// name: "Tryndamere",
// title: "the Barbarian King",
// image: {
// full: "Tryndamere.png",
// sprite: "champion3.png",
// group: "champion",
// x: 384,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Gragas: {
// id: 79,
// key: "Gragas",
// name: "Gragas",
// title: "the Rabble Rouser",
// image: {
// full: "Gragas.png",
// sprite: "champion1.png",
// group: "champion",
// x: 0,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Cassiopeia: {
// id: 69,
// key: "Cassiopeia",
// name: "Cassiopeia",
// title: "the Serpent's Embrace",
// image: {
// full: "Cassiopeia.png",
// sprite: "champion0.png",
// group: "champion",
// x: 144,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Poppy: {
// id: 78,
// key: "Poppy",
// name: "Poppy",
// title: "the Iron Ambassador",
// image: {
// full: "Poppy.png",
// sprite: "champion2.png",
// group: "champion",
// x: 96,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Ryze: {
// id: 13,
// key: "Ryze",
// name: "Ryze",
// title: "the Rogue Mage",
// image: {
// full: "Ryze.png",
// sprite: "champion2.png",
// group: "champion",
// x: 432,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Sion: {
// id: 14,
// key: "Sion",
// name: "Sion",
// title: "The Undead Juggernaut",
// image: {
// full: "Sion.png",
// sprite: "champion2.png",
// group: "champion",
// x: 240,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Annie: {
// id: 1,
// key: "Annie",
// name: "Annie",
// title: "the Dark Child",
// image: {
// full: "Annie.png",
// sprite: "champion0.png",
// group: "champion",
// x: 288,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Karma: {
// id: 43,
// key: "Karma",
// name: "Karma",
// title: "the Enlightened One",
// image: {
// full: "Karma.png",
// sprite: "champion1.png",
// group: "champion",
// x: 0,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Nautilus: {
// id: 111,
// key: "Nautilus",
// name: "Nautilus",
// title: "the Titan of the Depths",
// image: {
// full: "Nautilus.png",
// sprite: "champion2.png",
// group: "champion",
// x: 240,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Lux: {
// id: 99,
// key: "Lux",
// name: "Lux",
// title: "the Lady of Luminosity",
// image: {
// full: "Lux.png",
// sprite: "champion1.png",
// group: "champion",
// x: 192,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Ahri: {
// id: 103,
// key: "Ahri",
// name: "Ahri",
// title: "the Nine-Tailed Fox",
// image: {
// full: "Ahri.png",
// sprite: "champion0.png",
// group: "champion",
// x: 48,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Olaf: {
// id: 2,
// key: "Olaf",
// name: "Olaf",
// title: "the Berserker",
// image: {
// full: "Olaf.png",
// sprite: "champion2.png",
// group: "champion",
// x: 432,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Viktor: {
// id: 112,
// key: "Viktor",
// name: "Viktor",
// title: "the Machine Herald",
// image: {
// full: "Viktor.png",
// sprite: "champion3.png",
// group: "champion",
// x: 384,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Anivia: {
// id: 34,
// key: "Anivia",
// name: "Anivia",
// title: "the Cryophoenix",
// image: {
// full: "Anivia.png",
// sprite: "champion0.png",
// group: "champion",
// x: 240,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Garen: {
// id: 86,
// key: "Garen",
// name: "Garen",
// title: "The Might of Demacia",
// image: {
// full: "Garen.png",
// sprite: "champion0.png",
// group: "champion",
// x: 384,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Singed: {
// id: 27,
// key: "Singed",
// name: "Singed",
// title: "the Mad Chemist",
// image: {
// full: "Singed.png",
// sprite: "champion2.png",
// group: "champion",
// x: 192,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Lissandra: {
// id: 127,
// key: "Lissandra",
// name: "Lissandra",
// title: "the Ice Witch",
// image: {
// full: "Lissandra.png",
// sprite: "champion1.png",
// group: "champion",
// x: 48,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Maokai: {
// id: 57,
// key: "Maokai",
// name: "Maokai",
// title: "the Twisted Treant",
// image: {
// full: "Maokai.png",
// sprite: "champion1.png",
// group: "champion",
// x: 336,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Morgana: {
// id: 25,
// key: "Morgana",
// name: "Morgana",
// title: "Fallen Angel",
// image: {
// full: "Morgana.png",
// sprite: "champion2.png",
// group: "champion",
// x: 96,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Evelynn: {
// id: 28,
// key: "Evelynn",
// name: "Evelynn",
// title: "the Widowmaker",
// image: {
// full: "Evelynn.png",
// sprite: "champion0.png",
// group: "champion",
// x: 48,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Fizz: {
// id: 105,
// key: "Fizz",
// name: "Fizz",
// title: "the Tidal Trickster",
// image: {
// full: "Fizz.png",
// sprite: "champion0.png",
// group: "champion",
// x: 240,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Zed: {
// id: 238,
// key: "Zed",
// name: "Zed",
// title: "the Master of Shadows",
// image: {
// full: "Zed.png",
// sprite: "champion3.png",
// group: "champion",
// x: 336,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Heimerdinger: {
// id: 74,
// key: "Heimerdinger",
// name: "Heimerdinger",
// title: "the Revered Inventor",
// image: {
// full: "Heimerdinger.png",
// sprite: "champion1.png",
// group: "champion",
// x: 144,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Rumble: {
// id: 68,
// key: "Rumble",
// name: "Rumble",
// title: "the Mechanized Menace",
// image: {
// full: "Rumble.png",
// sprite: "champion2.png",
// group: "champion",
// x: 384,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Mordekaiser: {
// id: 82,
// key: "Mordekaiser",
// name: "Mordekaiser",
// title: "the Master of Metal",
// image: {
// full: "Mordekaiser.png",
// sprite: "champion2.png",
// group: "champion",
// x: 48,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Sona: {
// id: 37,
// key: "Sona",
// name: "Sona",
// title: "Maven of the Strings",
// image: {
// full: "Sona.png",
// sprite: "champion2.png",
// group: "champion",
// x: 384,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Katarina: {
// id: 55,
// key: "Katarina",
// name: "Katarina",
// title: "the Sinister Blade",
// image: {
// full: "Katarina.png",
// sprite: "champion1.png",
// group: "champion",
// x: 144,
// y: 48,
// w: 48,
// h: 48
// }
// },
// KogMaw: {
// id: 96,
// key: "KogMaw",
// name: "Kog'Maw",
// title: "the Mouth of the Abyss",
// image: {
// full: "KogMaw.png",
// sprite: "champion1.png",
// group: "champion",
// x: 336,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Ashe: {
// id: 22,
// key: "Ashe",
// name: "Ashe",
// title: "the Frost Archer",
// image: {
// full: "Ashe.png",
// sprite: "champion0.png",
// group: "champion",
// x: 336,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Lulu: {
// id: 117,
// key: "Lulu",
// name: "Lulu",
// title: "the Fae Sorceress",
// image: {
// full: "Lulu.png",
// sprite: "champion1.png",
// group: "champion",
// x: 144,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Karthus: {
// id: 30,
// key: "Karthus",
// name: "Karthus",
// title: "the Deathsinger",
// image: {
// full: "Karthus.png",
// sprite: "champion1.png",
// group: "champion",
// x: 48,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Alistar: {
// id: 12,
// key: "Alistar",
// name: "Alistar",
// title: "the Minotaur",
// image: {
// full: "Alistar.png",
// sprite: "champion0.png",
// group: "champion",
// x: 144,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Darius: {
// id: 122,
// key: "Darius",
// name: "Darius",
// title: "the Hand of Noxus",
// image: {
// full: "Darius.png",
// sprite: "champion0.png",
// group: "champion",
// x: 288,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Vayne: {
// id: 67,
// key: "Vayne",
// name: "Vayne",
// title: "the Night Hunter",
// image: {
// full: "Vayne.png",
// sprite: "champion3.png",
// group: "champion",
// x: 192,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Varus: {
// id: 110,
// key: "Varus",
// name: "Varus",
// title: "the Arrow of Retribution",
// image: {
// full: "Varus.png",
// sprite: "champion3.png",
// group: "champion",
// x: 144,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Udyr: {
// id: 77,
// key: "Udyr",
// name: "Udyr",
// title: "the Spirit Walker",
// image: {
// full: "Udyr.png",
// sprite: "champion3.png",
// group: "champion",
// x: 48,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Jayce: {
// id: 126,
// key: "Jayce",
// name: "Jayce",
// title: "the Defender of Tomorrow",
// image: {
// full: "Jayce.png",
// sprite: "champion1.png",
// group: "champion",
// x: 384,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Leona: {
// id: 89,
// key: "Leona",
// name: "Leona",
// title: "the Radiant Dawn",
// image: {
// full: "Leona.png",
// sprite: "champion1.png",
// group: "champion",
// x: 0,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Syndra: {
// id: 134,
// key: "Syndra",
// name: "Syndra",
// title: "the Dark Sovereign",
// image: {
// full: "Syndra.png",
// sprite: "champion3.png",
// group: "champion",
// x: 48,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Pantheon: {
// id: 80,
// key: "Pantheon",
// name: "Pantheon",
// title: "the Artisan of War",
// image: {
// full: "Pantheon.png",
// sprite: "champion2.png",
// group: "champion",
// x: 48,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Khazix: {
// id: 121,
// key: "Khazix",
// name: "Kha'Zix",
// title: "the Voidreaver",
// image: {
// full: "Khazix.png",
// sprite: "champion1.png",
// group: "champion",
// x: 288,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Riven: {
// id: 92,
// key: "Riven",
// name: "Riven",
// title: "the Exile",
// image: {
// full: "Riven.png",
// sprite: "champion2.png",
// group: "champion",
// x: 336,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Corki: {
// id: 42,
// key: "Corki",
// name: "Corki",
// title: "the Daring Bombardier",
// image: {
// full: "Corki.png",
// sprite: "champion0.png",
// group: "champion",
// x: 240,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Azir: {
// id: 268,
// key: "Azir",
// name: "Azir",
// title: "the Emperor of the Sands",
// image: {
// full: "Azir.png",
// sprite: "champion0.png",
// group: "champion",
// x: 384,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Caitlyn: {
// id: 51,
// key: "Caitlyn",
// name: "Caitlyn",
// title: "the Sheriff of Piltover",
// image: {
// full: "Caitlyn.png",
// sprite: "champion0.png",
// group: "champion",
// x: 96,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Nidalee: {
// id: 76,
// key: "Nidalee",
// name: "Nidalee",
// title: "the Bestial Huntress",
// image: {
// full: "Nidalee.png",
// sprite: "champion2.png",
// group: "champion",
// x: 288,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Galio: {
// id: 3,
// key: "Galio",
// name: "Galio",
// title: "the Sentinel's Sorrow",
// image: {
// full: "Galio.png",
// sprite: "champion0.png",
// group: "champion",
// x: 288,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Kennen: {
// id: 85,
// key: "Kennen",
// name: "Kennen",
// title: "the Heart of the Tempest",
// image: {
// full: "Kennen.png",
// sprite: "champion1.png",
// group: "champion",
// x: 240,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Veigar: {
// id: 45,
// key: "Veigar",
// name: "Veigar",
// title: "the Tiny Master of Evil",
// image: {
// full: "Veigar.png",
// sprite: "champion3.png",
// group: "champion",
// x: 240,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Gnar: {
// id: 150,
// key: "Gnar",
// name: "Gnar",
// title: "the Missing Link",
// image: {
// full: "Gnar.png",
// sprite: "champion0.png",
// group: "champion",
// x: 432,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Graves: {
// id: 104,
// key: "Graves",
// name: "Graves",
// title: "the Outlaw",
// image: {
// full: "Graves.png",
// sprite: "champion1.png",
// group: "champion",
// x: 48,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Malzahar: {
// id: 90,
// key: "Malzahar",
// name: "Malzahar",
// title: "the Prophet of the Void",
// image: {
// full: "Malzahar.png",
// sprite: "champion1.png",
// group: "champion",
// x: 288,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Vi: {
// id: 254,
// key: "Vi",
// name: "Vi",
// title: "the Piltover Enforcer",
// image: {
// full: "Vi.png",
// sprite: "champion3.png",
// group: "champion",
// x: 336,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Kayle: {
// id: 10,
// key: "Kayle",
// name: "Kayle",
// title: "The Judicator",
// image: {
// full: "Kayle.png",
// sprite: "champion1.png",
// group: "champion",
// x: 192,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Irelia: {
// id: 39,
// key: "Irelia",
// name: "Irelia",
// title: "the Will of the Blades",
// image: {
// full: "Irelia.png",
// sprite: "champion1.png",
// group: "champion",
// x: 192,
// y: 0,
// w: 48,
// h: 48
// }
// },
// LeeSin: {
// id: 64,
// key: "LeeSin",
// name: "Lee Sin",
// title: "the Blind Monk",
// image: {
// full: "LeeSin.png",
// sprite: "champion1.png",
// group: "champion",
// x: 432,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Elise: {
// id: 60,
// key: "Elise",
// name: "Elise",
// title: "The Spider Queen",
// image: {
// full: "Elise.png",
// sprite: "champion0.png",
// group: "champion",
// x: 0,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Volibear: {
// id: 106,
// key: "Volibear",
// name: "Volibear",
// title: "the Thunder's Roar",
// image: {
// full: "Volibear.png",
// sprite: "champion3.png",
// group: "champion",
// x: 0,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Nunu: {
// id: 20,
// key: "Nunu",
// name: "Nunu",
// title: "the Yeti Rider",
// image: {
// full: "Nunu.png",
// sprite: "champion2.png",
// group: "champion",
// x: 384,
// y: 0,
// w: 48,
// h: 48
// }
// },
// TwistedFate: {
// id: 4,
// key: "TwistedFate",
// name: "Twisted Fate",
// title: "the Card Master",
// image: {
// full: "TwistedFate.png",
// sprite: "champion3.png",
// group: "champion",
// x: 432,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Jax: {
// id: 24,
// key: "Jax",
// name: "Jax",
// title: "Grandmaster at Arms",
// image: {
// full: "Jax.png",
// sprite: "champion1.png",
// group: "champion",
// x: 336,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Shyvana: {
// id: 102,
// key: "Shyvana",
// name: "Shyvana",
// title: "the Half-Dragon",
// image: {
// full: "Shyvana.png",
// sprite: "champion2.png",
// group: "champion",
// x: 144,
// y: 96,
// w: 48,
// h: 48
// }
// },
// DrMundo: {
// id: 36,
// key: "DrMundo",
// name: "Dr. Mundo",
// title: "the Madman of Zaun",
// image: {
// full: "DrMundo.png",
// sprite: "champion0.png",
// group: "champion",
// x: 432,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Brand: {
// id: 63,
// key: "Brand",
// name: "Brand",
// title: "the Burning Vengeance",
// image: {
// full: "Brand.png",
// sprite: "champion0.png",
// group: "champion",
// x: 0,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Diana: {
// id: 131,
// key: "Diana",
// name: "Diana",
// title: "Scorn of the Moon",
// image: {
// full: "Diana.png",
// sprite: "champion0.png",
// group: "champion",
// x: 336,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Sejuani: {
// id: 113,
// key: "Sejuani",
// name: "Sejuani",
// title: "the Winter's Wrath",
// image: {
// full: "Sejuani.png",
// sprite: "champion2.png",
// group: "champion",
// x: 0,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Vladimir: {
// id: 8,
// key: "Vladimir",
// name: "Vladimir",
// title: "the Crimson Reaper",
// image: {
// full: "Vladimir.png",
// sprite: "champion3.png",
// group: "champion",
// x: 432,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Zac: {
// id: 154,
// key: "Zac",
// name: "Zac",
// title: "the Secret Weapon",
// image: {
// full: "Zac.png",
// sprite: "champion3.png",
// group: "champion",
// x: 288,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Quinn: {
// id: 133,
// key: "Quinn",
// name: "Quinn",
// title: "Demacia's Wings",
// image: {
// full: "Quinn.png",
// sprite: "champion2.png",
// group: "champion",
// x: 144,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Akali: {
// id: 84,
// key: "Akali",
// name: "Akali",
// title: "the Fist of Shadow",
// image: {
// full: "Akali.png",
// sprite: "champion0.png",
// group: "champion",
// x: 96,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Tristana: {
// id: 18,
// key: "Tristana",
// name: "Tristana",
// title: "the Megling Gunner",
// image: {
// full: "Tristana.png",
// sprite: "champion3.png",
// group: "champion",
// x: 288,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Hecarim: {
// id: 120,
// key: "Hecarim",
// name: "Hecarim",
// title: "the Shadow of War",
// image: {
// full: "Hecarim.png",
// sprite: "champion1.png",
// group: "champion",
// x: 96,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Sivir: {
// id: 15,
// key: "Sivir",
// name: "Sivir",
// title: "the Battle Mistress",
// image: {
// full: "Sivir.png",
// sprite: "champion2.png",
// group: "champion",
// x: 288,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Lucian: {
// id: 236,
// key: "Lucian",
// name: "Lucian",
// title: "the Purifier",
// image: {
// full: "Lucian.png",
// sprite: "champion1.png",
// group: "champion",
// x: 96,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Rengar: {
// id: 107,
// key: "Rengar",
// name: "Rengar",
// title: "the Pridestalker",
// image: {
// full: "Rengar.png",
// sprite: "champion2.png",
// group: "champion",
// x: 288,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Warwick: {
// id: 19,
// key: "Warwick",
// name: "Warwick",
// title: "the Blood Hunter",
// image: {
// full: "Warwick.png",
// sprite: "champion3.png",
// group: "champion",
// x: 48,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Skarner: {
// id: 72,
// key: "Skarner",
// name: "Skarner",
// title: "the Crystal Vanguard",
// image: {
// full: "Skarner.png",
// sprite: "champion2.png",
// group: "champion",
// x: 336,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Malphite: {
// id: 54,
// key: "Malphite",
// name: "Malphite",
// title: "Shard of the Monolith",
// image: {
// full: "Malphite.png",
// sprite: "champion1.png",
// group: "champion",
// x: 240,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Yasuo: {
// id: 157,
// key: "Yasuo",
// name: "Yasuo",
// title: "the Unforgiven",
// image: {
// full: "Yasuo.png",
// sprite: "champion3.png",
// group: "champion",
// x: 192,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Xerath: {
// id: 101,
// key: "Xerath",
// name: "Xerath",
// title: "the Magus Ascendant",
// image: {
// full: "Xerath.png",
// sprite: "champion3.png",
// group: "champion",
// x: 96,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Teemo: {
// id: 17,
// key: "Teemo",
// name: "Teemo",
// title: "the Swift Scout",
// image: {
// full: "Teemo.png",
// sprite: "champion3.png",
// group: "champion",
// x: 192,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Nasus: {
// id: 75,
// key: "Nasus",
// name: "Nasus",
// title: "the Curator of the Sands",
// image: {
// full: "Nasus.png",
// sprite: "champion2.png",
// group: "champion",
// x: 192,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Renekton: {
// id: 58,
// key: "Renekton",
// name: "Renekton",
// title: "the Butcher of the Sands",
// image: {
// full: "Renekton.png",
// sprite: "champion2.png",
// group: "champion",
// x: 240,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Draven: {
// id: 119,
// key: "Draven",
// name: "Draven",
// title: "the Glorious Executioner",
// image: {
// full: "Draven.png",
// sprite: "champion0.png",
// group: "champion",
// x: 384,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Shaco: {
// id: 35,
// key: "Shaco",
// name: "Shaco",
// title: "the Demon Jester",
// image: {
// full: "Shaco.png",
// sprite: "champion2.png",
// group: "champion",
// x: 48,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Swain: {
// id: 50,
// key: "Swain",
// name: "Swain",
// title: "the Master Tactician",
// image: {
// full: "Swain.png",
// sprite: "champion3.png",
// group: "champion",
// x: 0,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Ziggs: {
// id: 115,
// key: "Ziggs",
// name: "Ziggs",
// title: "the Hexplosives Expert",
// image: {
// full: "Ziggs.png",
// sprite: "champion3.png",
// group: "champion",
// x: 384,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Janna: {
// id: 40,
// key: "Janna",
// name: "Janna",
// title: "the Storm's Fury",
// image: {
// full: "Janna.png",
// sprite: "champion1.png",
// group: "champion",
// x: 240,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Talon: {
// id: 91,
// key: "Talon",
// name: "Talon",
// title: "the Blade's Shadow",
// image: {
// full: "Talon.png",
// sprite: "champion3.png",
// group: "champion",
// x: 96,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Orianna: {
// id: 61,
// key: "Orianna",
// name: "Orianna",
// title: "the Lady of Clockwork",
// image: {
// full: "Orianna.png",
// sprite: "champion2.png",
// group: "champion",
// x: 0,
// y: 48,
// w: 48,
// h: 48
// }
// },
// FiddleSticks: {
// id: 9,
// key: "FiddleSticks",
// name: "Fiddlesticks",
// title: "the Harbinger of Doom",
// image: {
// full: "FiddleSticks.png",
// sprite: "champion0.png",
// group: "champion",
// x: 144,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Fiora: {
// id: 114,
// key: "Fiora",
// name: "Fiora",
// title: "the Grand Duelist",
// image: {
// full: "Fiora.png",
// sprite: "champion0.png",
// group: "champion",
// x: 192,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Chogath: {
// id: 31,
// key: "Chogath",
// name: "Cho'Gath",
// title: "the Terror of the Void",
// image: {
// full: "Chogath.png",
// sprite: "champion0.png",
// group: "champion",
// x: 192,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Rammus: {
// id: 33,
// key: "Rammus",
// name: "Rammus",
// title: "the Armordillo",
// image: {
// full: "Rammus.png",
// sprite: "champion2.png",
// group: "champion",
// x: 192,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Leblanc: {
// id: 7,
// key: "Leblanc",
// name: "LeBlanc",
// title: "the Deceiver",
// image: {
// full: "Leblanc.png",
// sprite: "champion1.png",
// group: "champion",
// x: 384,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Zilean: {
// id: 26,
// key: "Zilean",
// name: "Zilean",
// title: "the Chronokeeper",
// image: {
// full: "Zilean.png",
// sprite: "champion3.png",
// group: "champion",
// x: 432,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Soraka: {
// id: 16,
// key: "Soraka",
// name: "Soraka",
// title: "the Starchild",
// image: {
// full: "Soraka.png",
// sprite: "champion2.png",
// group: "champion",
// x: 432,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Nocturne: {
// id: 56,
// key: "Nocturne",
// name: "Nocturne",
// title: "the Eternal Nightmare",
// image: {
// full: "Nocturne.png",
// sprite: "champion2.png",
// group: "champion",
// x: 336,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Jinx: {
// id: 222,
// key: "Jinx",
// name: "Jinx",
// title: "the Loose Cannon",
// image: {
// full: "Jinx.png",
// sprite: "champion1.png",
// group: "champion",
// x: 432,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Yorick: {
// id: 83,
// key: "Yorick",
// name: "Yorick",
// title: "the Gravedigger",
// image: {
// full: "Yorick.png",
// sprite: "champion3.png",
// group: "champion",
// x: 240,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Urgot: {
// id: 6,
// key: "Urgot",
// name: "Urgot",
// title: "the Headsman's Pride",
// image: {
// full: "Urgot.png",
// sprite: "champion3.png",
// group: "champion",
// x: 96,
// y: 48,
// w: 48,
// h: 48
// }
// },
// MissFortune: {
// id: 21,
// key: "MissFortune",
// name: "Miss Fortune",
// title: "the Bounty Hunter",
// image: {
// full: "MissFortune.png",
// sprite: "champion1.png",
// group: "champion",
// x: 432,
// y: 96,
// w: 48,
// h: 48
// }
// },
// MonkeyKing: {
// id: 62,
// key: "MonkeyKing",
// name: "Wukong",
// title: "the Monkey King",
// image: {
// full: "MonkeyKing.png",
// sprite: "champion2.png",
// group: "champion",
// x: 0,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Blitzcrank: {
// id: 53,
// key: "Blitzcrank",
// name: "Blitzcrank",
// title: "the Great Steam Golem",
// image: {
// full: "Blitzcrank.png",
// sprite: "champion0.png",
// group: "champion",
// x: 432,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Shen: {
// id: 98,
// key: "Shen",
// name: "Shen",
// title: "Eye of Twilight",
// image: {
// full: "Shen.png",
// sprite: "champion2.png",
// group: "champion",
// x: 96,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Braum: {
// id: 201,
// key: "Braum",
// name: "Braum",
// title: "the Heart of the Freljord",
// image: {
// full: "Braum.png",
// sprite: "champion0.png",
// group: "champion",
// x: 48,
// y: 48,
// w: 48,
// h: 48
// }
// },
// XinZhao: {
// id: 5,
// key: "XinZhao",
// name: "Xin Zhao",
// title: "the Seneschal of Demacia",
// image: {
// full: "XinZhao.png",
// sprite: "champion3.png",
// group: "champion",
// x: 144,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Twitch: {
// id: 29,
// key: "Twitch",
// name: "Twitch",
// title: "the Plague Rat",
// image: {
// full: "Twitch.png",
// sprite: "champion3.png",
// group: "champion",
// x: 0,
// y: 48,
// w: 48,
// h: 48
// }
// },
// MasterYi: {
// id: 11,
// key: "MasterYi",
// name: "Master Yi",
// title: "the Wuju Bladesman",
// image: {
// full: "MasterYi.png",
// sprite: "champion1.png",
// group: "champion",
// x: 384,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Taric: {
// id: 44,
// key: "Taric",
// name: "Taric",
// title: "the Gem Knight",
// image: {
// full: "Taric.png",
// sprite: "champion3.png",
// group: "champion",
// x: 144,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Amumu: {
// id: 32,
// key: "Amumu",
// name: "Amumu",
// title: "the Sad Mummy",
// image: {
// full: "Amumu.png",
// sprite: "champion0.png",
// group: "champion",
// x: 192,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Gangplank: {
// id: 41,
// key: "Gangplank",
// name: "Gangplank",
// title: "the Saltwater Scourge",
// image: {
// full: "Gangplank.png",
// sprite: "champion0.png",
// group: "champion",
// x: 336,
// y: 96,
// w: 48,
// h: 48
// }
// },
// Trundle: {
// id: 48,
// key: "Trundle",
// name: "Trundle",
// title: "the Troll King",
// image: {
// full: "Trundle.png",
// sprite: "champion3.png",
// group: "champion",
// x: 336,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Kassadin: {
// id: 38,
// key: "Kassadin",
// name: "Kassadin",
// title: "the Void Walker",
// image: {
// full: "Kassadin.png",
// sprite: "champion1.png",
// group: "champion",
// x: 96,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Velkoz: {
// id: 161,
// key: "Velkoz",
// name: "Vel'Koz",
// title: "the Eye of the Void",
// image: {
// full: "Velkoz.png",
// sprite: "champion3.png",
// group: "champion",
// x: 288,
// y: 48,
// w: 48,
// h: 48
// }
// },
// Zyra: {
// id: 143,
// key: "Zyra",
// name: "Zyra",
// title: "Rise of the Thorns",
// image: {
// full: "Zyra.png",
// sprite: "champion4.png",
// group: "champion",
// x: 0,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Nami: {
// id: 267,
// key: "Nami",
// name: "Nami",
// title: "the Tidecaller",
// image: {
// full: "Nami.png",
// sprite: "champion2.png",
// group: "champion",
// x: 144,
// y: 0,
// w: 48,
// h: 48
// }
// },
// JarvanIV: {
// id: 59,
// key: "JarvanIV",
// name: "Jarvan IV",
// title: "the Exemplar of Demacia",
// image: {
// full: "JarvanIV.png",
// sprite: "champion1.png",
// group: "champion",
// x: 288,
// y: 0,
// w: 48,
// h: 48
// }
// },
// Ezreal: {
// id: 81,
// key: "Ezreal",
// name: "Ezreal",
// title: "the Prodigal Explorer",
// image: {
// full: "Ezreal.png",
// sprite: "champion0.png",
// group: "champion",
// x: 96,
// y: 96,
// w: 48,
// h: 48
// }
// }
// }
// })
// })









