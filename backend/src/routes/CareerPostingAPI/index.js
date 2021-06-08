const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Career = require("../../model/CareerPost");
const route = express.Router();
const config = require("config");
const mongo = require("mongodb");

var ObjectID = mongo.ObjectID;

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
*/

// Route to get all the posts for buy and sell
route.get("/community/career/", async (req, res) => {
  try {
    Career.find({}, function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// Route to get the info for a specific post by id
route.get("/community/posting/career/:id", function (req, res) {
  var o_id = mongo.ObjectID(req.params.id);

  try {
    Career.find({ _id: o_id }, function (error, result) {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Method for searching Title and Tags
route.post("/community/posting/career/q/", function (req, res) {
  var textToSearch = req.body.searchWords;
  //console.log(req);

  Career.find(
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

// // Method for searching by tag (filtering)
route.post("/community/career/tag/", function (req, res) {
  var textToSearch = req.body.searchWords;
  if (textToSearch == "All") textToSearch = "";

  Career.find({ tags: new RegExp(textToSearch, "i") }, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Needs error checking.
// Creates a post for something to sell in the buyandsell feed
route.post("/community/createcareerpost/", async function (req, res) {
  try {
    let career = new Career({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      date: new Date(),
      tags: req.body.tags,
    });
    await career.save();
    res.status(200).json(career);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Needs to be filled out, allows updating of a post
route.post("/community/updatecareerpost/:id", function (req, res) {
  var o_id = ObjectID(req.params.id);
  delete req.body._id;

  Career.findOneAndUpdate(
    { _id: o_id },
    { $set: req.body },
    { upsert: false },
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Needs to be filled out, allows deleting of a post
route.delete("/community/deletecareerpost/:id", function (req, res) {
  var o_id = mongo.ObjectID(req.params.id);
  Career.deleteOne({ _id: o_id }, function (error, result) {
    if (error) throw error;
    res.status(200).json(true);
  });
});

// Adds a new comment or subcomment to the comment feed for a post
route.post("/community/posting/career/comment/:id", function (req, res) {
  var doc = req.body;

  doc._id = new ObjectID();
  var o_id = mongo.ObjectID(req.params.id);

  // Check to see if this is a subcomment
  if (req.body.replyingTo != undefined) {
    // Create new id and add the replyingTo to the document
    doc.replyingTo = req.body.replyingTo;

    Career.findOneAndUpdate(
      {
        _id: o_id,
        comments: { $elemMatch: { _id: ObjectID(doc.replyingTo) } },
      },
      { $push: { "comments.$.subcomments": doc } },
      function (err, result) {
        if (err) throw err;
        res.status(200).json(true);
      }
    );
  } else {
    Career.findOneAndUpdate(
      { _id: o_id },
      { $push: { comments: doc } },
      function (err, result) {
        if (err) throw err;
        res.status(200).json(true);
      }
    );
  }
});

module.exports = route;
