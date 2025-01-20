const mongoose = require("mongoose");

const adminWhitelistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("AdminWhitelist", adminWhitelistSchema);
