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
});

module.exports = User = mongoose.model("user", UserSchema);
