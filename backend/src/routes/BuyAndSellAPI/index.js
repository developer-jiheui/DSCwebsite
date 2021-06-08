const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BuyAndSell = require("../../model/BuyAndSellPost");
const route = express.Router();
const config = require("config");
const mongo = require("mongodb");

var ObjectID = mongo.ObjectID;

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
*/

// Route to get all the posts for buy and sell
route.get("/community/buyandsell/", async (req, res) => {
  try {
    BuyAndSell.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// Route to get the info for a specific post
route.get("/community/posting/buysell/:id", function (req, res) {
  var o_id = mongo.ObjectID(req.params.id);

  try {
    BuyAndSell.find({ _id: o_id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Method for searching
route.post("/community/posting/buysell/q/", function (req, res) {
  var textToSearch = req.body.searchWords;

  BuyAndSell.find(
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
route.post("/community/buysell/tag/", function (req, res) {
  var textToSearch = req.body.searchWords;
  if (textToSearch == "All") textToSearch = "";

  BuyAndSell.find(
    { tags: new RegExp(textToSearch, "i") },
    function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});

// Needs error checking. Change route name?
// Creates a post for something to sell in the buyandsell feed
route.post("/community/createpost/", async function (req, res) {
  try {
    let BuySell = new BuyAndSell({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: "New Westminster",
      tags: req.body.tags,
    });
    await BuySell.save();
    res.status(200).json(BuySell);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// // Needs to be filled out, allows updating of a post
route.post("/community/updatebuysellpost/:id", function (req, res) {
  console.log(req.body);
  console.log(req.params.id);

  var o_id = mongo.ObjectID(req.params.id);
  delete req.body._id;

  BuyAndSell.findOneAndUpdate(
    { _id: o_id },
    { $set: req.body },
    { upsert: false },
    function (err, result) {
      if (err) throw err;
      //console.log(result)
      //TODO find what this should return
      res.send(true);
    }
  );
});

// Needs to be filled out, allows deleting of a post
route.delete("/community/deletebuysellpost/:id", function (req, res) {
  try {
    var o_id = mongo.ObjectID(req.params.id);
    BuyAndSell.deleteOne({ _id: o_id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

// Adds a new comment or subcomment to the comment feed for a post
route.post("/community/posting/buysell/comment/:id", async function (req, res) {
  var doc = req.body;

  doc._id = new ObjectID();
  var o_id = mongo.ObjectID(req.params.id);

  if (req.body.replyingTo != undefined) {
    doc.replyingTo = req.body.replyingTo;

    BuyAndSell.findOneAndUpdate(
      {
        _id: o_id,
        comments: { $elemMatch: { _id: ObjectID(doc.replyingTo) } },
      },
      { $push: { "comments.$.subcomments": doc } },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  } else {
    BuyAndSell.findOneAndUpdate(
      { _id: o_id },
      { $push: { comments: doc } },
      function (err, result) {
        // if (err) {
        //   console.log(err);
        // } else {
        //   console.log(result);
        // }
        console.log(result);
      }
    );
  }
});

module.exports = route;
