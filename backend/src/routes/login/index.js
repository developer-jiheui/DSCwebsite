const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Login = require("../../model/Login");
const route = express.Router();

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
 */

route.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // validate the checks from the middleware:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // if there is no error, we are going to check if the user exist.
    const { email, password } = req.body;

    try {
      let login = await Login.findOne({ email });

      if (login) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      // create the user login:
      login = new Login({ email, password });

      const salt = await bcrypt.genSalt(10);
      login.password = await bcrypt.hash(password, salt);

      await login.save();

      res.status(200).json(login);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = route;
