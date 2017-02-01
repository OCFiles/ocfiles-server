'use strict';

const express = require('express');
const router = express.Router();

module.exports = function (gfs) {
    const controller = require('./controller')(gfs);
    // Files routes
    router
        .post('/', controller.upload.single('file'), controller.uploadFile)
        .post('/url', controller.downloadFileFromUrl)
        .get('/:filename', controller.checkIfFileExist, controller.getFile)
        .delete('/:filename', controller.checkIfFileExist, controller.deleteFile);

    return router;
};