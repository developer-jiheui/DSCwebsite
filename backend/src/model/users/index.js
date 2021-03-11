const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: BigInt,
    required: true,
  },
  number: {
    type: String,
    required: false,
  },
  whatsApp: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
    required: false,
  },
  preferredPronouns: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  socialMedia: {
    github: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
  },
});

module.exports = User = mongoose.model("User", UserSchema);
