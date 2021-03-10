const express = require("express");
const router = express.Router();

/*
 * @route   GET /auth
 * @desc    Route for auth
 * @access  Private
 */
router.get("/", (req, res) => {
  res.send({
    user: "CaffeineJunkies",
    access: "Without coffe I shall deny!!!",
  });
});

module.exports = router;
