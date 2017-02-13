'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const chalk = require('chalk');
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/environment');

const app = express();
app.use(bodyParser.json());

// Data base connection 
mongoose.connect(config.mongo.uri, (err) => {
    if (err) {
        console.log(chalk.bold.red('Please check you MongoDB instance connection'));
    }
});

const connection = mongoose.connection;

const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

connection.once('open', () => {

    const gfs = Grid(connection.db);

    require('./routes')(app, gfs);

    app.get('/', (req, res) => {
        return res.send({
            api: 'OCFiles API v0.1.0'
        });
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use('/:url(api|auth)/*', function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                ok: false,
                message: err.message,
                status: 500,
                error: err.stack
            });
        });
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                ok: false,
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use('/:url(api|auth)/*', function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            ok: false,
            message: err.message,
            status: 500,
            error: err.stack
        });
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
});

app.listen(config.port);
// Export app for test
module.exports = app;