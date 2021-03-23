const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userLogin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userLogin",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
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
  socialMedia: [
    {
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
  ],
  bio: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
