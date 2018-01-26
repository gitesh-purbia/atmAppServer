'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.IP || '0.0.0.0',
  // Server port
  port: process.env.PORT ||
    8080,
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URL ||
      'mongodb://localhost/test'
  },
  seedDB: false

};
