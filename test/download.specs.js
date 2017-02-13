'use strict';
// Set default node environment to development
/* global describe it beforeEach */

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const fs = require('fs');

const config = require('../config/environment');
const server = require('../server');
const image = path.join(config.root, './test/smile.png');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Root /api/v1/files Test
 */

describe ('Testing Files resources', () => {
    /**
     * Testing POST /api/v1/files
     */
    describe ('POST /api/v1/files: ', () => {
        it ('Upload an image should GET the file infos as response', (done) => {
            chai.request(server)
                .post('/api/v1/files')
                .attach('file', fs.readFileSync(image), 'smile.png')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('ok', true);
                    res.body.should.have.property('publicName');
                    res.body.should.have.property('name');
                    res.body.should.have.property('url');
                    res.body.should.have.property('message', 'File has been successfully created');
                    done();
                });
        });

        it ('It should get an error if there\'s no file', (done) => {
            chai.request(server)
                .post('/api/v1/files')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('ok', false);
                    res.body.should.have.property('error');
                    res.body.should.have.property('message');
                    done();
                });
        });
        
    });

    /**
     * Testing GET /api/v1/files/:fileName
     */
    describe ('Testing GET /api/v1/files/:filename', () => {
        it ('It should GET not found if the file name don\'t exist', (done) => {
            chai.request(server)
                .get('/api/v1/file/test')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('ok', false);
                    res.body.should.have.property('message', 'Not Found');
                    done();
                });
        });
    });
});