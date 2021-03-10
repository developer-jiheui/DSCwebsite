const express = require("express");
const router = express.Router();

/*
 * @route   GET /users
 * @desc    User routing test for the api
 * @access  Public
 */
router.get("/", (req, res) => {
  res.send({
    id: "0",
    username: "CaffeineJunkies",
    password: "coffe",
  });
});

module.exports = router;
