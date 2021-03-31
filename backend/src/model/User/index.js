const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "login",
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
    required: false,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  preferredPronoum: {
    type: String,
    required: false,
  },
  phone: {
    whatsapp: {
      type: String,
      required: false,
    },
    canadian: {
      type: String,
      required: false,
    },
  },
  // https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
  // https://stackoverflow.com/questions/4796914/store-images-in-a-mongodb-database
  avatar: {
    type: Buffer,
    contentType: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  social: {
    website: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
  },
  codingSkills: {
    type: [String],
    required: true,
  },
  userType: {
    type: Number,
    required: true,
  },
  isExec: {
    type: Boolean,
    required: false,
  },
  program: {
    type: String,
    required: false,
  },
  expectedGraduationDate: {
    type: Date,
    required: false,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
