/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/summarys', require('./api/summary'));

  app.use('/api/mailer', require('./api/mailer'));

  app.use('/api/stats', require('./api/stat'));

  app.use('/api/btc_exchange', require('./api/btcexchange'));
  app.use('/api/btc_transactions', require('./api/btc_transaction'));
  app.use('/api/matches', require('./api/match'));
  app.use('/api/summoners', require('./api/summoner'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
