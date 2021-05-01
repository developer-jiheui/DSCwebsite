const express = require("express");
const auth = require("../../middleware/auth");
const Login = require("../../model/Login");
const User = require("../../model/User");
const route = express.Router();

/* @route   GET /admin/dashboard
 * @desc    Check access for admin dashboard
 * @access  private
 */

route.get("/dashboard", auth, async(req, res) => {
  try {
    let user = await User.findOne({ login: req.login.id });
    if(user.isExec) {
      return res.status(200).json({ msg: "Yes!", data: user.isExec});
    } 

    return res.status(400).json({ msg: "User is not an Admin..." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

/* @route   DELETE /admin/user/:id
 * @desc    Delete user profile and all related data.
 * @access  private
 */

route.delete("/user/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ login: req.login.id });
    if (user.isExec === true) {
      loginID = req.params.id;
      // remove user:
      // let targetUser = await User.findOne({ login: loginID });
      await User.findOneAndRemove({ login: loginID });
      // remove login:
      await Login.findOneAndRemove({ _id: loginID });
      return res.status(200).json({ msg: "User deleted!" });
    }

    return res.status(400).json({ msg: "User is not an Admin..." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

/* @route   DELETE /admin/post/event/:id
 * @desc    Delete post
 * @access  private
 */

route.delete("/post/event/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ login: req.login.id });
    if (user.isExec === true) {
      // @todo

      return res.status(200).json({ msg: "Event deleted!" });
    }

    return res.status(400).json({ msg: "User is not an Admin..." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

/* @route   DELETE /admin/post/news/:id
 * @desc    Delete post
 * @access  private
 */

route.delete("/post/news/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ login: req.login.id });
    if (user.isExec === true) {
      // @todo

      return res.status(200).json({ msg: "News deleted!" });
    }

    return res.status(400).json({ msg: "User is not an Admin..." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

/* @route   GET /user
 * @desc    Fetch all user profiles
 * @access  private
 */

route.get("/user/all", async (req, res) => {
  try {
    let user = await User.find();

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.json({ msg: "Server error!" });
  }
});

/* @route   POST /admin/user/:id
 * @desc    Delete user profile and all related data.
 * @access  private
 */

route.post("/user/:id", auth, async (req, res) => {});

module.exports = route;
