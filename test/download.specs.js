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
const gfs = require('../server').gfs;
const image = path.join(config.root, './test/smile.png');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Root /api/v1/files Test
 */

describe('Testing Files resources', () => {
	/**
	 * Testing POST /api/v1/files
	 */
	describe('POST /api/v1/files: ', () => {
		it('Upload an image should GET the file infos as response', (done) => {
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

		it('It should get an error if there\'s no file', (done) => {
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
	 * Testing POST /api/v1/files/url
	 */
	describe('POST /api/v1/files: ', () => {
		it('It should GET the file infos as response for HTTP URL on upload', (done) => {
			const url = 'http://hartschools.net/wp-content/uploads/2016/02/Testing-Sign.jpg';
			chai.request(server)
				.post('/api/v1/files/url')
				.send({url})
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

		it('It should GET the file infos as response for HTTPs URL on upload', (done) => {
			const url = 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/lab-128.png';
			chai.request(server)
				.post('/api/v1/files/url')
				.send({url})
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

		it('It should GET an error for empty URL', (done) => {
			chai.request(server)
				.post('/api/v1/files/url')
				.send({url: ''})
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
	describe('Testing GET /api/v1/files/:filename', () => {
		it('It should GET not found if the file name don\'t exist', (done) => {
			chai.request(server)
				.get('/api/v1/file/test')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property('ok', false);
					res.body.should.have.property('message', 'Not Found');
					done();
				});
		});

		it('It should GET the file', (done) => {
			const mimeType = mime.lookup(image);
			const fileName = 'smile.png';
			const writeStream = gfs.createWriteStream({
				filename: 'smile.png',
				content_type: mime.contentType('smile.png'),
				metadata: {
					mime: mimeType,
					name: fileName
				}
			});
			fs.createReadStream(image)
				.on('end', () => {
					setTimeout(() => {
						chai.request(server)
						.get(`/api/v1/files/${fileName}`)
						.end((err, res) => {
							res.should.have.status(200);
							done();
						});
					}, 300);
				})
				.pipe(writeStream);
		});
	});

	/**
	 * Testing DELETE /api/v1/files/:fileName
	 */
	describe ('Testing DELETE /api/v1/files/:filename', () => {
		it('It should GET not found if the file name don\'t exist', (done) => {
			chai.request(server)
				.delete('/api/v1/file/test')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property('ok', false);
					res.body.should.have.property('message', 'Not Found');
					done();
				});
		});
		it('It should DELETE the file', (done) => {
			const mimeType = mime.lookup(image);
			const fileName = 'smile.png';
			const writeStream = gfs.createWriteStream({
				filename: 'smile.png',
				content_type: mime.contentType('smile.png'),
				metadata: {
					mime: mimeType,
					name: fileName
				}
			});
			fs.createReadStream(image)
				.on('end', () => {
					setTimeout(() => {
						chai.request(server)
						.delete(`/api/v1/files/${fileName}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.have.property('ok', true);
							res.body.should.have.property('message');
							done();
						});
					}, 300);
				})
				.pipe(writeStream);
		});
	});

	/**
	 * Testing GET /api/v1/files/{filename}/details
	 */
	describe ('Testing GET /api/v1/files/{filename}/details', () => {
		it('It should GET not found if the file name don\'t exist', (done) => {
			chai.request(server)
				.get('/api/v1/file/test/details')
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.have.property('ok', false);
					res.body.should.have.property('message', 'Not Found');
					done();
				});
		});
		it('It should GET the file details', (done) => {
			const mimeType = mime.lookup(image);
			const fileName = 'smile.png';
			const writeStream = gfs.createWriteStream({
				filename: 'smile.png',
				content_type: mime.contentType('smile.png'),
				metadata: {
					mime: mimeType,
					name: fileName
				}
			});
			fs.createReadStream(image)
				.on('end', () => {
					setTimeout(() => {
						chai.request(server)
						.get(`/api/v1/files/${fileName}/details`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.have.property('_id');
							res.body.should.have.property('filename', 'smile.png');
							res.body.should.have.property('contentType');
							res.body.should.have.property('length');
							res.body.should.have.property('uploadDate');
							res.body.should.have.property('metadata');
							res.body.metadata.should.be.a('object');
							done();
						});
					}, 300);
				})
				.pipe(writeStream);
		});
	});
});