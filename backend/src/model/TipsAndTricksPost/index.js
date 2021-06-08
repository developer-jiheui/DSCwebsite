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
    required: true,
  },
  //This may not be a good way to write this, will need to change to array
  tags: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    required: false,
  },
});

module.exports = TipsAndTricks = mongoose.model(
  "TipsAndTricksPost",
  TipsAndTricksPost
);
