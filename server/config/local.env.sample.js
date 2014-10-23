'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'https://gentle-eyrie-1530.herokuapp.com/',
  SESSION_SECRET: "lolbet-secret",
  RIOT_API_KEY:     'secret',
  MASHAPE_API_KEY: 'secret',
  BITCOIN_ADDRESS: 'secret',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};

