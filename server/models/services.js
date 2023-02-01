const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
    description: {
        type: String,
        required: true
    },
    serviceNo: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('service', serviceSchema);