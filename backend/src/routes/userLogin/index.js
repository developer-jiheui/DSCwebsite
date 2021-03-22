const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const UserLogin = require("../../model/UserLogin");

/*
 * @route   POST /login
 * @desc    User routing to add/find a user
 * @access  Public
 */
router.post(
  "/",
  [
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
    const { email, password } = req.body;

    // try-catch block for mongoDB:
    try {
      // check the user by email:
      let userLogin = await UserLogin.findOne({ email });
      if (userLogin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // if not found, create a User object model and add it to the mongoDB:
      userLogin = new UserLogin({ email, password });

      // encrypt password:
      const salt = await bcrypt.genSalt(10);
      userLogin.password = await bcrypt.hash(password, salt);

      await userLogin.save();

      // after saving the user with an encrypted password, generate the jsonwebtoken:
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
          return res.json({ token });
        }
      );

      // res.status(200).send({
      //   user,
      //   msg: "User saved with success",
      // });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error!");
    }

    // console.log(req.body);
    // res.send("Request Received");
  }
);

module.exports = router;
