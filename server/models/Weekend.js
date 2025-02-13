const mongoose = require('mongoose');

const weekendSchema = new mongoose.Schema({
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
  ticket: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Weekend', weekendSchema);
