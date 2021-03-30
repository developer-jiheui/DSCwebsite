const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require("../../model/Login");
const User = require("../../model/User");
const route = express.Router();
const config = require("config");

/* @route   GET /user
 * @desc    Get the current user profile
 * @access  private
 */

route.get("/self", auth, async (req, res) => {
  try {
    let user = await User.findOne({ login: req.login.id });
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.json({ msg: "Server error!" });
  }
});

/* @route   POST /user
 * @desc    Register/update a user
 * @access  private
 */

route.post(
  "/",
  [
    auth,
    [
      check("firstName", "Please insert a valid first name").not().isEmpty(),
      check("lastName", "Please insert a valid last name").not().isEmpty(),
      check("userType", "Please select user type").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      firstName,
      lastName,
      userType,
      studentNumber,
      preferredPronoum,
      phone,
      bio,
      social,
      codingSkills,
    } = req.body;

    const trimmedcodingSkills = codingSkills
      .split(",")
      .map((skill) => skill.trim());

    let user = await User.findOne({ login: req.login.id });
    if (user) {
      user = await User.findOneAndUpdate(
        { login: req.login.id },
        {
          $set: {
            firstName,
            lastName,
            userType,
            studentNumber,
            preferredPronoum,
            phone,
            bio,
            social,
            codingSkills: trimmedcodingSkills,
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

/* @route   GET /user
 * @desc    Fetch all user profiles
 * @access  private
 */

route.get("/", async (req, res) => {
  try {
    let user = await Login.find().select("-password");

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.json({ msg: "Server error!" });
  }
});

/* @route   GET /user/:id
 * @desc    Get user profile by id.
 * @access  public
 */

route.get("/:id", async (req, res) => {
  try {
    let user = await User.find({ login: req.params.id }).select("-password");

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.json({ msg: "Server error!" });
  }
});

/* @route   DELETE /user
 * @desc    Delete user profile and all related data.
 * @access  private
 */

route.delete("/", auth, async (req, res) => {
  try {
    // @todo: remove posts

    // remove profile:
    await User.findOneAndRemove({ login: req.login.id });
    // // remove login:
    await Login.findOneAndRemove({ _id: req.login.id });
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

module.exports = route;
