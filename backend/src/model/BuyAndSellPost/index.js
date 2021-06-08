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
    required: true,
  },
  location: {
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

module.exports = BuyAndSellt = mongoose.model("BuyAndSellPost", BuyAndSellPost);
