const mongoose = require("mongoose");

const BuyAndSellPost = new mongoose.Schema({
  _id:{

  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: String,
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
