const mongoose = require("mongoose");

const TipsAndTricksPost = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  comments: {
    type: Array,
    required: false
  }

});

module.exports = TipsAndTricks = mongoose.model("TipsAndTricksPost", TipsAndTricksPost);
