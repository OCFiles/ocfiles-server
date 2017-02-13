'use strict';

const fs = require('fs');
const mime = require('mime-types');
const multer = require('multer');
const path = require('path');
const uuidV4 = require('uuid/v4');
const url = require('url');
const request = require('request');

const config = require('../../config/environment');

const uploadDir = path.join(config.root, './uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidV4()}${path.extname(file.originalname)}`);
    }
});
// Instansiate the multer
const upload = multer({
    storage: storage
});


module.exports = function (gfs) {
    return {
        uploadFile(req, res) {
            const tempFilePath = `${uploadDir}/${req.file.filename}`;
            const mimeType = mime.lookup(path.extname(req.file.filename));
            const fileName = req.body.name || req.file.originalname;
            const writeStream = gfs.createWriteStream({
                filename: req.file.filename,
                content_type: mime.contentType(req.file.filename),
                metadata: {
                    mime: mimeType,
                    name: fileName
                }
            });
            fs.createReadStream(tempFilePath)
                .on('end', () => {
                    fs.unlink(tempFilePath, (err) => {
                        return res.status(201).send({
                            ok: true,
                            publicName: req.file.filename,
                            name: fileName,
                            url: `${config.host}/api/${config.apiVersion}/files/${req.file.filename}`,
                            message: 'File has been successfully created'
                        });
                    });
                })
                .on('error', (err) => {
                    return res.status(500).send({
                        ok: false,
                        message: 'Error uploading file',
                        error: err.message
                    });
                })
                .pipe(writeStream);
        },
        checkIfFileExist(req, res, next) {
            gfs.findOne({
                filename: req.params.filename
            }, function (err, file) {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        message: err.message
                    });
                }
                if (!file) {
                    return res.status(404).send({
                        ok: false,
                        message: 'File not found!'
                    });
                }
                req.file = file;
                next();
            });
        },
        getFile(req, res) {
            res.type(req.file.contentType);
            const readStream = gfs.createReadStream({
                filename: req.params.filename
            });

            readStream.on('error', (err) => {
                return res.status(500).send({
                    ok: false,
                    message: 'File not found!',
                    error: err.message
                });
            });
            readStream.pipe(res);
        },
        deleteFile(req, res) {
            gfs.remove({
                filename: req.params.filename
            }, function (err) {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        message: 'Something went wrong please try later',
                        error: err.message
                    });
                }
                return res.status(200).send({
                    ok: true,
                    message: `${req.params.filename} has been successfully deleted!`
                });
            });
        },
        upload,
        downloadFileFromUrl(req, res) {
            let parsedUrl = path.parse(req.body.url);
            let publicName = `${uuidV4()}${parsedUrl.ext}`;
            let fileName = req.body.name || parsedUrl.name;

            request.get(req.body.url)
                .on('response', function (response) {
                    const writeStream = gfs.createWriteStream({
                        filename: publicName,
                        content_type: response.headers['content-type'],
                        metadata: {
                            mime: response.headers['content-type'],
                            name: fileName
                        }
                    });
                    writeStream.on('finish', () => {
                            return res.status(201).send({
                                ok: true,
                                publicName: publicName,
                                name: fileName,
                                url: `${config.host}/api/${config.apiVersion}/files/${publicName}`,
                                message: 'File has been successfully created'
                            });
                        })
                        .on('error', (err) => {
                            return res.status(500).send({
                                ok: false,
                                message: 'Error uploading file',
                                error: err.message
                            });
                        });
                    response.pipe(writeStream);
                }).on('error', function (err) {
                    return res.status(500).send({
                        ok: false,
                        message: 'Failed to load the url'
                    });
                });
        },
        getFileDetails(req, res) {
            delete req.file.chunkSize;
            delete req.file.aliases;
            delete req.file.md5;
            return res.send(req.file);
        }
    };
};