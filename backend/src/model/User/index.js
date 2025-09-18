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
    data: Buffer,
    contentType: String,
  },
  bio: {
    type: String,
  },
  social: {
    website: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  codingSkills: {
    type: [String],
  },
  userType: {
    type: Number,
  },
  isExec: {
    type: Boolean,
  },
  program: {
    type: String,
  },
  expectedGraduationDate: {
    type: Date,
  },
  courses: {
    type: [String],
  },
  isWorkingDeveloper: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
