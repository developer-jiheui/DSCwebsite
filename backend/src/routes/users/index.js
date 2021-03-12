const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

/*
 * @route   GET /users
 * @desc    User routing test for the api
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
      res.status(200).send({
        firstName,
        lastName,
        email,
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
