const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    _id: {
    type: String,
    required: true,
  },
  post_type: {
    type: String,
    required: true
  },
  // seq: { type: Number, default: 0 },
  //   post_type: {
  //   type: String,
  //   required: true,
  // }
});

module.exports = Post = mongoose.model("post", PostSchema);
