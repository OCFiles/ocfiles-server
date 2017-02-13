'use strict';
// Set default node environment to development
/* global describe it beforeEach */

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const config = require('../config/environment');
const server = require('../server').app;
const image = path.join(config.root, './test/smile.png');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Root /api/v1/files Test
 */

describe('Testing Files resources', () => {
	/**
	 * Testing GET /
	 */
	describe('GET / ', () => {
		it('It should GET OCFiles API v0.1.0', (done) => {
			chai.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('api', 'OCFiles API v0.1.0');
					done();
				});
		});

	});

    describe('POST / ', () => {
		it('It should get not found error', (done) => {
			chai.request(server)
				.post('/')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});

	});
});