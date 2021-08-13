const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TipsandTricks = require("../../model/TipsAndTricksPost");
const route = express.Router();
const config = require("config");
const mongo = require("mongodb");

var ObjectID = mongo.ObjectID;

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
*/

// Route to get all the posts for buy and sell
route.get("/community/tipsandtricks/", async (req, res) => {
  try {
    TipsandTricks.find({}, function (error, result) {
      if (error) throw error;
      return res.send(result);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// Route to get the info for a specific post
route.get("/community/posting/tipsandtricks/:id", function (req, res) {
  var o_id = new ObjectID(req.params.id);

  try {
    TipsandTricks.find({ _id: o_id }, function (error, result) {
      if (error) throw error;
      return res.send(result);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Method for searching by tag (filtering)
route.post("/community/tipsandtricks/tag/", function(req, res){

  var textToSearch = req.body.searchWords;
  if (textToSearch == "All")
    textToSearch = "";

    TipsandTricks.find(
      { tags: new RegExp(textToSearch, "i") },
      function (err, result) {
        if (err) throw err;
        res.send(result);
      }
    );

});

// Needs error checking.
// Creates a post for something to sell in the buyandsell feed
route.post("/community/createpost/", async function (req, res) {

  // Validate that user is logged in and post their user information

  var doc = req.body;

  try {
    let tipsandtricks = new TipsandTricks({
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
      tags: req.body.tags,
    });
    await tipsandtricks.save();
    res.status(200).json(tipsandtricks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Method for searching
route.post("/community/posting/tipsandtricks/q/", function(req, res){

  var textToSearch = req.body.searchWords;
  //console.log(req);

  TipsandTricks.find(
    {
      $or: [
        { title: new RegExp(textToSearch, "i") },
        { tags: new RegExp(textToSearch, "i") },
      ],
    },
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );

});

// Needs to be filled out, allows updating of a post
route.post("/community/updatetipsandtrickspost/:id", function (req, res) {

  // Validate that user is logged in and post their user information

  var o_id = mongo.ObjectID(req.params.id);
  TipsandTricks.findByIdAndUpdate(
    { _id: o_id },
    { $set: req.body },
    { upsert: false },
    function (err, result) {
      if (err) throw err;
      //console.log(result)
      //TODO find what this should return
      res.send(true);
      db.close();
    }
  );
});

// Needs to be filled out, allows deleting of a post
route.delete("/community/deletetipsandtrickspost/:id", function (req, res) {

  // Validate that user is logged in and post their user information

  var o_id = mongo.ObjectID(req.params.id);
  TipsandTricks.deleteOne({ _id: o_id }, function (err, result) {
    if (err) throw err;
    //console.log(result)
    res.send(true);
  });
});

// Adds a new comment or subcomment to the comment feed for a post
route.post("/community/posting/tipsandtricks/comment/:id", function (req, res) {

  // Validate that user is logged in and post their user information

  var doc = req.body;
  doc._id = new ObjectID();
  var o_id = mongo.ObjectID(req.params.id);

  // Check to see if this is a subcomment
  if (req.body.replyingTo != undefined) {
    // Create new id and add the replyingTo to the document
    doc.replyingTo = req.body.replyingTo;

    TipsandTricks.findOneAndUpdate(
      {
        _id: o_id,
        comments: { $elemMatch: { _id: ObjectID(doc.replyingTo) } },
      },
      { $push: { "comments.$.subcomments": doc } },
      function (err, result) {
        if (err) throw err;
        res.send(true);
      }
    );
  } else {
    TipsandTricks.findOneAndUpdate(
      { _id: o_id },
      { $push: { comments: doc } },
      function (err, result) {
        if (err) throw err;
        res.send(true);
      }
    );
  }
});

module.exports = route;
