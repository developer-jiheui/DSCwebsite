const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");

const UserLogin = require("../../model/UserLogin");

/*
 * @route   GET /auth
 * @desc    Route for auth
 * @access  Public
 */
router.get("/", auth, async (req, res) => {
  try {
    // search user by id and return the data, except the password!!!
    const userLogin = await UserLogin.findById(req.userLogin.id).select(
      "-password"
    );
    res.json(userLogin);
  } catch (error) {
    if (error) console.log(error.message);
    res.status(500).send("Server error");
  }
});

/*
 * @route   POST /auth
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // check validation and return an object array with the failed checks:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstructor (just use the name of the variable you are receiving from )
    const { email, password } = req.body;

    // try-catch block for mongoDB:
    try {
      // check the user by email:
      let userLogin = await UserLogin.findOne({ email });
      if (!userLogin) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      // after validating the user, we set the login:
      const payload = {
        userLogin: {
          id: userLogin.id,
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
