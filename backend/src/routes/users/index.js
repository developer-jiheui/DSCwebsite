const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const config = require("config");

/*
 * @route   POST /users
 * @desc    User routing to add/find a user
 * @access  Public
 */
router.post(
  "/",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("studentNumber", "Student id is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // check validation and return an object array with the failed checks:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstructor (just use the name of the variable you are receiving from )
    const { firstName, lastName, studentNumber, email, password } = req.body;

    // try-catch block for mongoDB:
    try {
      // check the user by email:
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // if not found, create a User object model and add it to the mongoDB:
      user = new User({ firstName, lastName, studentNumber, email, password });

      // encrypt password:
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // after saving the user with an encrypted password, generate the jsonwebtoken:
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );

      // res.status(200).send({
      //   user,
      //   msg: "User saved with success",
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }

    // console.log(req.body);
    // res.send("Request Received");
  }
);

module.exports = router;
