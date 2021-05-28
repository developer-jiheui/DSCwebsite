const mongoose = require("mongoose");

const CareerPost = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  comments:{
    type: Array,
    required: false
  }

});

module.exports = Career = mongoose.model("CareerPost", CareerPost);
