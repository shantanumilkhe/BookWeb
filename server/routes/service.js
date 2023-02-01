const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const service = require('../models/services');


router.get('/allservices', (req, res) => {
    service.find({}, (err, files) => {
        if (err) return res.status(500).send({ error: err });
        const filesData = files.map(file => {
            return {
                id: file._id,
                googleId: file.googleId,
                name: file.name,
                size: file.size,
                type: file.type
            }
        });
        res.status(200).send({ files: filesData });
    });
})

module.exports = router;