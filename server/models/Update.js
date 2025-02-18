const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String, // Name of the admin or club
    required: true,
  },
  link: {
    type: String, // Optional link for additional information
    default: null,
  },
  category:{
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Update", updateSchema);
