const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require("../../model/Login");
const route = express.Router();
const config = require("config");

/* @route   GET /auth
 * @desc    Register/fetch a user login
 * @access  private
 */

route.get("/", auth, async (req, res) => {
  try {
    const login = await Login.findById(req.login.id).select("-password");
    res.json({ login });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

/* @route   POST /auth
 * @desc    Autenticate user and fetch the token
 * @access  public
 */

route.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let login = await Login.findOne({ email });
      if (!login) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, login.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      console.log("Here");

      // return the jsonwebtokengm
      const payload = {
        login: {
          id: login.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ msg: "Server error!" });
    }
  }
);

module.exports = route;
