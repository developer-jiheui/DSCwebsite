const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../model/Post");
const config = require("config");

/* Get All Posts by Type */
router.get("/", async (req, res) => {
    const post_type = req.body.post_type;
    // fetch posts of post type
    let posts = await Post.find({ post_type });    
    res.status(200).json({
        message: "Getting posts!",
        data: posts
    });
});

/* Create post */
router.post(
    "/",
    [
        check("title", "A Title is required").not().isEmpty(),
        check("description", "A description is required").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // create post to save to Post db
        // create post based on post type and save

        res.status(200).send("Creating Post Success!")
    });

/* Update a Post */
router.put("/", (req, res) => {
    res.status(200).send("Saving Post Success!")
});

/* Delete a Post */
router.delete("/", (req, res) => {
    res.status(200).send("Delete Post Success!")
});

module.exports = router;