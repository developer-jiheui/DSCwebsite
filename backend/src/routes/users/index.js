const express = require("express");
const router = express.Router();

/*
 * @route   GET /users
 * @desc    User routing test for the api
 * @access  Public
 */
router.get("/", (req, res) => {
  //   res.send(req.body);
  console.log(req.body);
  res.send("Request Received");
});

module.exports = router;
