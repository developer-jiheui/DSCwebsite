const mongoose = require("mongoose");

const UserLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  //   preferredName: {
  //     type: String,
  //     required: false,
  //   },
  password: {
    type: String,
    required: true,
  },
});

module.exports = UserLogin = mongoose.model("userLogin", UserLoginSchema);
