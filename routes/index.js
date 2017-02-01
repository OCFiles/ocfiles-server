'use strict';
const config = require('../config/enviroment');
module.exports = function (app, gfs) {
    app.use('/api/' + config.apiVersion + '/files', require('./files')(gfs));
};