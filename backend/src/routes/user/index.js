const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require("../../model/Login");
const User = require("../../model/User");
const route = express.Router();
const config = require("config");
const { findOneAndUpdate } = require("../../model/Login");

/* @route   GET /user
 * @desc    Get the current user profile
 * @access  private
 */

route.get("/", auth, async (req, res) => {
  //   let user = await User.findById({ login: req.login.id }).populate("login", [
  //     "email",
  //   ]);
  //   res.send("User route!");
});

module.exports = route;

/* @route   POST /user
 * @desc    Register/update a user
 * @access  public
 */

route.post(
  "/",
  [
    auth,
    [
      check("firstName", "Please insert a valid first name").not().isEmpty(),
      check("lastName", "Please insert a valid last name").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName } = req.body;
    let user = await User.findOne({ login: req.login.id });
    if (user) {
      user = await User.findOneAndUpdate(
        { login: req.login.id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
          },
        },
        { new: true }
      );

      return res.status(200).json(user);
    } else {
      let user = new User({
        login: req.login.id,
        firstName: firstName,
        lastName: lastName,
      });
      await user.save();
      res.status(200).json(user);
    }
  }
);

module.exports = route;
