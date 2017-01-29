'use strict';

module.exports = function(app, gfs) {
    app.use('/api/v1/files', require('./files')(gfs));
};