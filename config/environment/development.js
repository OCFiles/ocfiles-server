'use strict';

// Development specific configuration
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/own-files-cloud-test'
    },
    seedDB: true
};