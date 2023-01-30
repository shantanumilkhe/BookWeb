const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const chapter = require('../models/book');
var storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, './documents')
  },


  filename: function (req, file, cb) {

    let filename = 'filenametogive';
    req.body.file = filename

    cb(null, filename)
  }
})





const upload = multer({ storage: storage })


const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


// Create a new drive instance
const drive = google.drive({ version: 'v3', auth: oAuth2Client });

router.post('/upload', upload.single("document"), (req, res) => {
  console.log(req.body)
  const index = (req.body.index);
  const newi = index.split('\n');
  const index1 = [];

  // Check if the request is a multi-part request (i.e. it contains a file)

  if (!req.is('multipart/form-data')) {
    return res.status(400).send({ message: 'Not a multipart request' });
  }

  // Parse the file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).send({ message: 'No file was provided' });
  }

  // Create a new file on Google Drive
  drive.files.create({
    resource: {
      name: file.originalname,
      mimeType: file.mimetype,
      //parents: ['Chapters'] // optional: put the file in a specific folder
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path)
    },
    fields: 'id'
  }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    } else {
      const newFile = new chapter({
        googleId: result.data.id,
        name: req.body.title,
        chapterNo: req.body.chapterNO,
        chapterIndex: newi,
        size: file.size,
        type: file.mimetype,
      });
      // save the new file object to the database
      newFile.save()

    }
    return res.status(200).send(result.data.id);
  });
});

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  drive.files.get({
    fileId: req.params.id,
    alt: 'media'
  }, { responseType: 'stream' }, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      response.data
        .on('end', () => {
          console.log('Done');
        })
        .on('error', (err) => {
          console.log('Error', err);
        })
        .pipe(res);
    }
  });

});



router.post('/updateChapter/:id', upload.single("document"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const index = (req.body.index);
  const newi = index.split('\n');

  let googleId = req.body.googleId;
  const name = req.body.title;
  const chapterNo = req.body.chapterNO;
  const chapterIndex = newi;

  // Check if the request is a multi-part request (i.e. it contains a file)

  if (!req.is('multipart/form-data')) {
    return res.status(400).send({ message: 'Not a multipart request' });
  }

  // Parse the file from the request
  const file = req.file;

  if (file) {
    // Create a new file on Google Drive
    await new Promise((resolve, reject) => {
      drive.files.create({
        resource: {
          name: file.originalname,
          mimeType: file.mimetype,
          //parents: ['Chapters'] // optional: put the file in a specific folder
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path)
        },
        fields: 'id'
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          googleId = result.data.id;
          resolve();
        }
      });
    });
  }


  // if (!req.body) {
  //     return res.status(400).send('Request body is missing');
  // }
  chapter.findByIdAndUpdate(req.params.id, {
    name: name,
    chapterNo: chapterNo,
    chapterIndex: chapterIndex,
    googleId: googleId
  }, { new: true }, (err, doc) => {
    if (!err) {
      res.redirect('/book');
    }
    else {
      console.log('Error in Updating Chapter : ' + JSON.stringify(err, undefined, 2));
    }
  });


})

module.exports = router;