const express = require("express");
// const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const route = express.Router();
const config = require("config");

var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;
var MongoClient = mongo.MongoClient;

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
 */

// TODO authentication and connection to our mongo db

// URL for mongo connection
var url = "mongodb://localhost:27017/";
// Name of database to read from
var databaseName = "test";
// Name of collection to read from
var collectionName = "tipsandtricks";

// Route to get all the posts for buy and sell
route.get(
  "/community/tipsandtricks/",
    async(req, res) => {

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(collectionName).find({}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result)
          res.send(result)
          db.close();
        });
      });
       
    });

// Route to get the info for a specific post
route.get("/community/posting/tipsandtricks/:id", function(req, res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    var o_id = mongo.ObjectID(req.params.id);
    dbo.collection(collectionName).find({"_id" : o_id}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result)
      res.send(result)
      db.close();
    });
  });

});

// Method for searching by tag (filtering)
route.post("/community/tipsandtricks/tag/", function(req, res){

  var textToSearch = req.body.searchWords;
  if (textToSearch == "All")
    textToSearch = "";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);

    dbo.collection(collectionName).find({tags: new RegExp(textToSearch, 'i')}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result)
      res.send(result)
      db.close();
    });
  });

});

// Needs error checking.
// Creates a post for something to sell in the buyandsell feed
route.post("/community/createpost/", function(req, res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    // TODO Must add check for what is being input
    var doc = req.body;
    dbo.collection(collectionName).insertOne(doc, function(err, result) {
      if (err) throw err;
      res.send(true);
      db.close();
    });
  });
});

// Method for searching
route.post("/community/posting/tipsandtricks/q/", function(req, res){

  var textToSearch = req.body.searchWords;
  //console.log(req);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);

    dbo.collection(collectionName).find({$or: [{title: new RegExp(textToSearch, 'i')}, {tags: new RegExp(textToSearch, 'i')}]}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result)
      res.send(result)
      db.close();
    });
  });

});

// Needs to be filled out, allows updating of a post
route.post("/community/updatetipsandtrickspost/:id", function(req, res){
  console.log(req.body);
  console.log(req.params.id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    var o_id = mongo.ObjectID(req.params.id)
    delete req.body._id;
    dbo.collection(collectionName).updateOne({_id: o_id}, {$set: req.body}, {upsert: false}, function(err, result) {
      if (err) throw err;
      console.log(result.modifiedCount)
      //console.log(result)
      //TODO find what this should return
      res.send(true)
      db.close();
    });
  });
});

// Needs to be filled out, allows deleting of a post
route.delete("/community/deletetipsandtrickspost/:id", function(req, res){
  console.log(req.body);
  console.log(req.body.id);

  var o_id = mongo.ObjectID(req.params.id)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).deleteOne({_id: o_id}, function(err, result) {
      if (err) throw err;
      console.log(result.deletedCount)
      //console.log(result)
      res.send(true)
      db.close();
    });
  });
});

// Adds a new comment or subcomment to the comment feed for a post
route.post("/community/posting/tipsandtricks/comment/:id", function(req, res){

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      var dbo = db.db(databaseName);
      var doc = req.body;

      // Check to see if this is a subcomment
      if (req.body.replyingTo != undefined)
      {
        // Create new id and add the replyingTo to the document
        doc._id = new ObjectID();
        var o_id = mongo.ObjectID(req.params.id);
        doc.replyingTo = req.body.replyingTo;

        dbo.collection(collectionName).updateOne({_id: o_id, "comments": {$elemMatch: {"_id": ObjectID(doc.replyingTo)}}}, {$push: {"comments.$.subcomments": doc}}, function(err, result) {
          if (err) throw err;
          db.close();
        });
      }else
      {
        // Create and insert new top level comment
        var newID = new ObjectID();
        doc._id = newID;
        var o_id = mongo.ObjectID(req.params.id);
        
        dbo.collection(collectionName).updateOne({"_id": o_id}, {$push: {"comments": doc}}, function(err, result) {
          if (err) throw err;
          db.close();
        });
      }
     
    });

});


//   [
//     check("email", "Email is required").not().isEmpty(),
//     check(
//       "password",
//       "Please enter a password with 6 or more characters"
//     ).isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     // validate the checks from the middleware:
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }

//     // if there is no error, we are going to check if the user exist.
//     const { email, password } = req.body;

//     try {
//       let login = await Login.findOne({ email });

//       if (login) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "User already exists!" }] });
//       }

//       // create the user login:
//       login = new Login({ email, password });

//       // encrypt the password before saving it in the database:
//       const salt = await bcrypt.genSalt(10);
//       login.password = await bcrypt.hash(password, salt);

//       await login.save();

//       // generates the jwt:
//       const payload = {
//         login: {
//           id: login.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 3600000 },
//         (error, token) => {
//           if (error) throw error;
//           res.json({ token });
//         }
//       );
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server error!");
//     }
//   }


module.exports = route;
