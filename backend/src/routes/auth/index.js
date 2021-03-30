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
 * @access  public
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

module.exports = route;
