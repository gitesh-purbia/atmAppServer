/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const config = require('./config/environment');

// Connect to MongoDB
// mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connect(config.mongo.uri, {
  useMongoClient: true,
  autoReconnect: true,
  promiseLibrary: require('bluebird')
});
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
const app = express();
const server = require('http').createServer(app);

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

process.on('uncaughtException', function(err) {
  console.log('process.on handler');
  console.log(err);
});

app.use(clientErrorHandler);
app.use(errorHandler);

function clientErrorHandler (err, req, res, next) {
  console.log('clientErrorHandler');
  if (req.xhr) {
    res.status(500).send({ error: 'internal server error' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  console.log('errorHandler');
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ error: err });
}

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, () => {
  console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
});

// Expose app
exports = module.exports = app;
