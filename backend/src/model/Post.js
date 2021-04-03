const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

const PostSchema = new mongoose.Schema({
    _id: {
    type: String,
    required: true,
  },
  seq: { type: Number, default: 0 },
    post_type: {
    type: String,
    required: true,
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
