'use strict';
const config = require('../config/environment');
module.exports = function (app, gfs) {
    app.use('/api/' + config.apiVersion + '/files', require('./files')(gfs));
};