const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
