const mongoose = require('mongoose');

const onedaySchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Oneday', onedaySchema);
