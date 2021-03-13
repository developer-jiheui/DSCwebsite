const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");

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
    check("email", "Please include a valid email").not().isEmpty(),
  ],
  async (req, res) => {
    // check validation and return an object array with the failed checks:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstructor (just use the name of the variable you are receiving from )
    const { firstName, lastName, email } = req.body;

    // try-catch block for mongoDB:
    try {
      // check the user by emai:
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // if not found, create a User object model and add it:
      user = new User({ firstName, lastName, email });
      await user.save();

      res.status(200).send({
        user,
        msg: "User saved with success",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }

    // console.log(req.body);
    // res.send("Request Received");
  }
);

/*
 * @route   GET /users
 * @desc    User routing to retrieve a user from the database
 * @access  Public
 */
router.get(
  "/",
  [check("email", "Please include a valid email").not().isEmpty()],
  async (req, res) => {
    // check validation and return an object array with the failed checks:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // deconstructor (just use the name of the variable you are receiving from )
    const { email } = req.body;

    // try-catch block for mongoDB:
    try {
      // check the user by emai:
      let user = await User.findOne({ email });
      if (!user) {
        res.status(500).json({ errors: [{ msg: "Server error!" }] });
      }

      res.status(200).send({
        user,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }

    // console.log(req.body);
    // res.send("Request Received");
  }
);

module.exports = router;
