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

// Needs error checking (id?). Change route name?
// Creates a post for something to sell in the buyandsell feed
route.post("/community/createpost/", async function (req, res) {

  // console.log(req.body.image);

  var priceParse = req.body.price;
  try{
    priceParseValid = /(^\d+$)|(^\d+\.\d{0,2}$)/.test(priceParse);

    console.log(priceParseValid)
    if (!priceParseValid)
      throw new Error();

    priceParse = "$" + parseFloat(priceParse).toFixed(2);
  }catch(error)
  {
    //console.log(error);
    priceParse = req.body.price;
  }

  console.log(priceParse)

  // Validate that user is logged in and post their user information
  id = new ObjectID();
  try {

    let BuySell = new BuyAndSell({
      _id: id,
      title: req.body.title,
      price: priceParse,
      date: new Date().toUTCString(),
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
  //console.log(req.body);
  //console.log(req.params.id);

  // Validate that user is logged in and post their user information

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

  // Validate that user is logged in and post their user information

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

  // Validate that user is logged in and post their user information

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
          //console.log(err);
        } else {
          //console.log(result);
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
        //console.log(result);
      }
    );
  }
});

module.exports = route;
