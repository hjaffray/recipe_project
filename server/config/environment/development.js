/*eslint no-process-env:0*/

import _ from 'lodash';

let localConfig;
try {
  localConfig = require('./local.js');
} catch(err) {
  localConfig = {};
}

// Development specific configuration
// ==================================
module.exports = _.merge(
    {
    // MongoDB connection options EDIT FOR Project01 1/5/23
    mongo: {
        useMongoClient: true,
        uri: process.env.MONGODB_URI || 'mongodb://web2-mongodb/web2-henjaffr-project1'
    },
    // Seed database on startup
        seedDB: true
    },
  localConfig);
