const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const gr = require('../models/gr');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './documents')
    },

    filename: function (req, file, cb) {
        let filename = 'GRfile';
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
            const newFile = new gr({
                googleId: result.data.id,
                name: req.body.title,
                size: file.size,
                type: file.mimetype,
            });
            // save the new file object to the database
            newFile.save()
        }
        return res.status(200).send({ message: 'File uploaded successfully', fileId: result.id });
    });
});

router.get('/allgrID', (req, res) => {
   gr.find({}, (err, files) => {
      if(err) return res.status(500).send({error: err});
      const filesData = files.map(file => {
        return {
            id: file._id,
          googleId: file.googleId,
          name: file.name,
        }
      });
      res.status(200).send({ files: filesData });
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

  router.delete('/deletegr/:id', (req, res) => {
    gr.findByIdAndRemove(req.params.id, (err, file) => {
      if (err) return res.status(500).send({ error: err });
      drive.files.delete({ fileId: file.googleId }, (err, result) => {
        if (err) return res.status(500).send({ error: err });
        res.status(200).send({ message: 'File deleted successfully' });
      });
    });
  });

  router.put('/updategr/:id', (req, res) => {
    gr.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, file) => {
      if (err) return res.status(500).send({ error: err });
      drive.files.update({ fileId: file.googleId, resource: { name: req.body.name } }, (err, result) => {
        if (err) return res.status(500).send({ error: err });
        res.status(200).send({ message: 'File updated successfully' });
      });
    });
  });


  
  module.exports = router;