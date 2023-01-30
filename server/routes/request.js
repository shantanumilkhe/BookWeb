const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const Chapter = require('../models/book');

router.get('/allChapterID', (req, res) => {
    Chapter.find({}, (err, files) => {
        if (err) return res.status(500).send({ error: err });
        const filesData = files.map(file => {
            return {
                id: file._id,
                googleId: file.googleId,
                name: file.name,
                chapterNo: file.chapterNo,
                chapterIndex: file.chapterIndex
            }
        });
        res.status(200).send({ files: filesData });
    });
});

router.get('/ChapterData/:id', async (req, res) => {
    try {
        let chpt = await Chapter.findOne({ _id: req.params.id });
        res.status(200).send(chpt);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteChapter/:id', (req, res) => {
    console.log(req.params.id);
    Chapter.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            console.log('Chapter Deleted Successfully')
            res.status(200)
            // res.send(doc);
        }
        else {
            console.log('Error in Deleting Chapter : ' + JSON.stringify(err, undefined, 2));
        }
    });
})





module.exports = router;