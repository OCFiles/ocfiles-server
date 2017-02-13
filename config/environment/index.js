'use strict';

const path = require('path');
const _ = require('lodash');

// All configurations will extend these options
// ============================================
const all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../'),

    apiVersion: 'v1',

    // Server port
    port: process.env.PORT || 3500,

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'DBbFZX3ZsUPRVniUA1Y1020NZzhRasrApsjGlPg2Nq8vB'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
    host: process.env.HOSTNAME || 'http://localhost:3500'
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});