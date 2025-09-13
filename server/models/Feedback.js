
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  impactLevel: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
}
,
   { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);