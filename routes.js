/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
  // Insert routes below

  app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  app.use('/api/cards', require('./api/cards'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api)/*')
    .get((req, res) => {
      res.status(404).json({
        message: 'Not found'
      });
    });

  // All other routes should redirect to the 'Hello World!'
  app.route('/*')
    .get((req, res) => {
      res.status(200).json({
        message: 'Hello World!'
      });
    });
};
