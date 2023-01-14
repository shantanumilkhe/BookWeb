const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  chapterNo:{
    type: Number,
   
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('chapter', chapterSchema);
