const express = require('express');
const router = express.Router();
const multer = require('multer');


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

const upload = multer({ storage: storage})

router.post('/upload',upload.single("document"),(req, res) => {
    console.log(req.file)
    // Check if the request is a multi-part request (i.e. it contains a file)
    
    if (!req.is('multipart/form-data')) {
      return res.status(400).send({ message: 'Not a multipart request' });
    }
  
    // Parse the file from the request
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: 'No file was provided' });
    }
  
    // Authenticate with Google Drive

    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )
    
    oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
    
  
    // Create a new drive instance
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  
    // Create a new file on Google Drive
    drive.files.create({
      resource: {
        name: file.name,
        mimeType: file.mimetype,
        parents: ['FOLDER_ID'] // optional: put the file in a specific folder
      },
      media: {
        mimeType: file.mimetype,
        body: file.data
      }
    }, (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      return res.status(200).send({ message: 'File uploaded successfully', fileId: result.id });
    });
  });

  module.exports = router;