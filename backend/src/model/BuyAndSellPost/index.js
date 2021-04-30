const mongoose = require("mongoose");

const BuyAndSellPost = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }

});

module.exports = BuyAndSellPost = mongoose.model("post", LoginSchema);
