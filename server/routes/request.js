const express = require('express');
const router = express.Router();
const multer = require('multer');
const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');
const Chapter = require('../models/book');

router.get('/allChapterID', (req, res) => {
    Chapter.find({}, (err, files) => {
      if(err) return res.status(500).send({error: err});
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

router.delete('/deleteChapter/:id',(req,res)=>{
    console.log(req.params.id);
    Chapter.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/book');
            // res.send(doc);
        }
        else{
            console.log('Error in Deleting Chapter : '+JSON.stringify(err,undefined,2));
        }
    });
})  

router.put('/updateChapter/:id',(req,res)=>{
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }
    Chapter.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        chapterNo: req.body.chapterNo,
        chapterIndex: req.body.chapterIndex
    },{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/book');
        }
        else{
            console.log('Error in Updating Chapter : '+JSON.stringify(err,undefined,2));
        }
    });
})


  

  module.exports = router;