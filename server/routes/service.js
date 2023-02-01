const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const service = require('../models/services');
const { cloudinary, storage } = require('../config/cloudinary')


router.get('/allservices', (req, res) => {
    service.find({}, (err, files) => {
        if (err) return res.status(500).send({ error: err });
        const filesData = files.map(file => {
            return {
                id: file._id,
                name: file.name,
                description: file.description,
                serviceNo: file.serviceNo,
                images: file.images
            }
        });
        res.status(200).send({ files: filesData });
    });
})

const upload = multer({ storage });

router.post('/addservice', upload.array('images'), async (req, res) => {
    try {
        const newService = new service({
            name: req.body.name,
            description: req.body.description,
            serviceNo: req.body.serviceNo,
            images: { url: req.files.path, filename: req.filename }
        })
        await newService.save();
        res.status(200).send(newService);
    } catch (error) {
        console.log(error);
    }
});

router.get('/serviceData/:id', async (req, res) => {
    try {
        let svc = await service.findOne({ _id: req.params.id });
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteservice/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const svc = await service.findById(id);
        await cloudinary.uploader.destroy(svc.images.filename);
        await svc.remove();
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

router.put('/updateservice/:id', upload.array('images'), async (req, res) => {
    try {
        const { id } = req.params;
        const svc = await service.findById(id);
        await cloudinary.uploader.destroy(svc.images.filename);
        
        svc.name = req.body.name;
        svc.description = req.body.description;
        svc.serviceNo = req.body.serviceNo;
        svc.images ={ url: req.files.path, filename: req.filename }
        await svc.save();
        res.status(200).send(svc);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;