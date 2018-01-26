'use strict';

const _ = require('lodash');

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: true,

  // Secret for session, you will want to change this and make it an environment variable
  session: {
    secrets: 'test-secret',
    ttl: 18000
  },

  // List of user roles
  // userRoles: ['user', 'admin'],
  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  THUMB_FILTER: 'ar_16:9,c_crop/c_fit,w_196,h_110,q_auto:low'
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {});
