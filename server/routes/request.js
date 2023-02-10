const express = require('express');
const router = express.Router();
const Chapter = require('../models/book');
const gr = require('../models/gr');

router.get('/allChapterID', (req, res) => {
    try{
    Chapter.find({}, (err, files) => {
        if (err) return res.status(500).send({ error: err });
        const filesData = files.map(file => {
            return {
                id: file._id,
                pdfId: file.pdfId,
                name: file.name,
                chapterNo: file.chapterNo,
                chapterIndex: file.chapterIndex
            }
        });
        res.status(200).send({ files: filesData });
    });
}catch(e){
    console.log(e)
  }
});

router.get('/ChapterData/:id', async (req, res) => {
    try {
        let chpt = await Chapter.findOne({ _id: req.params.id });
        res.status(200).send(chpt);
    } catch (error) {
        console.log(error);
    }
});

router.get('/latestgr', async (req, res) => {
    try {
        let gree = await gr.find({}).sort({$natural:-1}).limit(10);
        console.log(gree)
        res.status(200).send(gree);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;