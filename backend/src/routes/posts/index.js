const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../model/Post");
const Event = require("../../model/Event");
const News = require("../../model/News");
const config = require("config");

/*
 * @route   POST /posts
 * @desc    Post routing to get 
 * @access  Public
 */
router.get("/", async (req, res) => {
    const post_type = req.body.post_type;
    // fetch posts of post type
    let posts = await Post.find({ post_type });    
    res.status(200).json({
        message: `Retrived ${posts.length} posts of type ${post_type}`,
        data: posts
    });
});

/* Create post */
router.post(
    "/",
    [
        check("title", "A Title is required").not().isEmpty(),
        check("description", "A description is required").not().isEmpty(),
        check("post_type", "Post Type is required").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // create post to save to Post db
            const {post_type} = req.body;
            let post = new Post({post_type});
            await post.save();

            // create post based on post type and save
            let newPost;
            const {title, description, is_featured, event_date} = req.body;
            switch(post_type) {
                case "Event":
                    newPost = new Event({
                        post,
                        title,
                        description,
                        is_featured,
                        event_date
                    });
                    break;
                case "News":
                    newPost = new News({
                        post_id: post,
                        title,                    
                        description,
                        is_featured
                    });
                    break;
            }

            try {
                await newPost.save();
            } catch(error) {
                console.error(error.message);
                // DELETE THE POST
                return res.status(500).send("Server Error!");
            }

            res.status(200).json({
                message: `Your ${post_type} post was successfully created!`,
                data: newPost
            });
        } catch(error) {
            console.error(error.message);
            return res.status(500).send("Server Error!");
        }
    });

/* Update a Post */
router.put("/", async (req, res) => {
    res.status(200).send("Saving Post Success!")
});

/* Delete a Post */
router.delete("/", async (req, res) => {
    res.status(200).send("Delete Post Success!")
});

module.exports = router;