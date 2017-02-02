'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const path = require('path');
const request = require('request');

const config = require('../config/enviroment');

const options = {
    method: 'POST',
    url: `http://localhost:${config.port}/api/v1/files`,
    formData: {
        file: {
            value: 'fs.createReadStream("/Users/macbookproretina13/Downloads/CV Karim Salih.pdf")',
            options: {
                filename: path.join(config.root, './test/smile.png'),
                contentType: null
            }
        }
    },
    json: true
};

describe('Upload File End point', () => {
    it('Upload a image file', (done) => {
        request(options, function (err, res, body) {
            should.not.exist(err);
            expect(res.statusCode).to.equal(201);
            expect(body).to.contain.all.keys(['ok', 'publicName', 'name', 'url', 'message']);
            done();
        });
    });
});