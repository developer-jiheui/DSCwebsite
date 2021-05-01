const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require("../../model/Login");
const User = require("../../model/User");
const route = express.Router();
const config = require("config");

// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.filename + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

/* @route   GET /user
 * @desc    Get the current user profile
 * @access  private
 */

route.get("/self", auth, async (req, res) => {
  try {
    console.log(req.login);
    let user = await User.findOne({ login: req.login.id });
    res.status(200).json(user);
  } catch (error) {
    console.error("SELF: " + error.message);
    res.json({ error: "Server error!" });
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
    check("firstName", "Please insert a valid first name").not().isEmpty(),
    check("lastName", "Please insert a valid last name").not().isEmpty(),
    check("userType", "Please select user type").isNumeric({ min: 0, max: 3 }),
    // check("userType", "Please select user type").not().isInt({min:0,max:3}),
  ],
  async (req, res) => {
    // validate the checks from the middleware:
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
      program,
      expectedGraduationDate,
      courses,
      isWorkingDeveloper,
      avatar,
      isExec,
    } = req.body;

    let isAdmin;
    userType === 0 ? (isAdmin = true) : (isAdmin = false);

    if (avatar === "" || typeof avatar === "undefined") {
      defaultAvatar =
        "https://stock.adobe.com/hu/Download/Watermarked/323309190";
    } else {
      defaultAvatar = avatar;
    }

    let graduationDate;
    if (expectedGraduationDate) {
      graduationDate = new Date(expectedGraduationDate);
    }

    let trimmedcodingSkills;
    if (codingSkills) {
      trimmedcodingSkills = codingSkills
        .split(",")
        .map((skill) => skill.trim());
    }

    let trimmedCourses;
    if (courses) {
      trimmedCourses = courses.split(",").map((course) => course.trim());
    }

    try {
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
              isExec: isAdmin /*isExec === null ? isAdmin : isExec,*/,
              program,
              expectedGraduationDate: graduationDate,
              courses: trimmedCourses,
              isWorkingDeveloper,
              avatar: defaultAvatar,
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
          userType: userType,
        });
        await user.save();
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }
  }
);

/* @route   GET /user
 * @desc    Fetch all user profiles
 * @access  private
 */

route.get("/", async (req, res) => {
  try {
    let user = await User.find();

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

// /* @route   DELETE /user
//  * @desc    Delete user profile and all related data.
//  * @access  private
//  */

// route.delete("/", auth, async (req, res) => {
//   try {
//     // @todo: remove posts

//     // remove profile:
//     await User.findOneAndRemove({ login: req.login.id });
//     // // remove login:
//     await Login.findOneAndRemove({ _id: req.login.id });
//     res.status(200).json({ msg: "User deleted!" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: "Server error!" });
//   }
// });


module.exports = route;
