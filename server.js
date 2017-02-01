'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');

const mongoose = require('mongoose');


const config = require('./config/enviroment');

const app = express();

// Data base connection 
mongoose.connect(config.mongo.uri);

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
});

app.listen(config.port);