const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  post_type: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
