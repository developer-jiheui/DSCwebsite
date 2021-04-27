const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../model/Post");
const Event = require("../../model/Event");
const News = require("../../model/News");
const config = require("config");

/*
 * @route   GET /posts/events
 * @desc    Posts routing to get all Events
 * @access  Public
 */
router.get("/events", async (req, res) => {
    try {
        // fetch posts based on post type
        let posts = await Event.find();
        res.status(200).json({
            message: `Retrived ${posts.length} posts of type Event`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/events/:id
 * @desc    Posts routing to get a single Event
 * @access  Public
 */

// TODO: implement route for single event find

/*
 * @route   GET /posts/news
 * @desc    Posts routing to get all News
 * @access  Public
 */
router.get("/news", async (req, res) => {
    try {
        // fetch posts based on post type
        let posts = await News.find();
        res.status(200).json({
            message: `Retrived ${posts.length} posts of type News`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/news/:id
 * @desc    Posts routing to get a single News
 * @access  Public
 */

// TODO: implement route for single news find

/*
 * @route   POST /posts
 * @desc    Posts routing to create a post
 * @access  Public
 */
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
            const { post_type } = req.body;
            let post = new Post({ post_type });

            await post.save();

            // create post based on post type and save
            const {
                title,
                description,
                is_countdown,
                is_featured,
                event_date
            } = req.body;

            let newPost;

            switch (post_type) {
                case "Event":
                    newPost = new Event({
                        post_id: post,
                        title,
                        description,
                        is_featured,
                        is_countdown,
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
                default:
                    return res.status(500).send(`CREATE: No post type match for ${post_type}`);
            }

            try {
                await newPost.save();
            } catch (error) {
                console.error(error.message);
                Post.findByIdAndDelete(post._id, (err) => {
                    if (err) console.error(err);
                    console.log(`Successfully deleted Post id ${post._id} upon failed creation of post type ${post_type}`);
                });
                return res.status(500).send(`Error occured creating new post of type ${post_type}!`);
            }

            res.status(200).json({
                message: `Your ${post_type} post was successfully created!`,
                data: newPost
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Error occured creating new post!");
        }
    });


/*
 * @route   PUT /posts/news
 * @desc    Posts routing to update a News post
 * @access  Public
 */
router.put("/news",
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

        const { id, data } = req.body;

        let updatedPost;
        try {
            updatedPost = await News.findOneAndUpdate({ _id: id }, data, { new: true });
        } catch (error) {
            return res.status(500).send("Error saving news!");
        }

        res.status(200).send({
            message: "Saving News Post Success!",
            data: updatedPost
        });
    });

/*
 * @route   PUT /posts/event
 * @desc    Posts routing to update an Event post
 * @access  Public
 */
router.put("/event",
    [
        check("title", "A Title is required").not().isEmpty(),
        check("description", "A description is required").not().isEmpty(),
        check("post_type", "Post Type is required").not().isEmpty()
    ],
    async (req, res) => {
        const { id, data } = req.body;

        let updatedPost;
        try {
            updatedPost = await Event.findOneAndUpdate({ _id: id }, data, { new: true });
        } catch (error) {
            return res.status(500).send("Error saving event!");
        }

        res.status(200).send({
            message: "Saving Event Post Success!",
            data: updatedPost
        });
    });

/* Delete a Post */
router.delete("/", async (req, res) => {
    const { id, post_type, post_id } = req.body;
    try {
        switch (post_type) {
            case "Event":
                await Event.findByIdAndDelete(id, (err) => {
                    if (err) console.log(err);
                    console.log("Delete success for type Event")
                });
                break;
            case "News":
                await News.findByIdAndDelete(id, (err) => {
                    if (err) console.log(err);
                    console.log("Delete success for type News")
                });
                break;
            default:
                return res.status(500).send(`DELETE: No post type match : ${post_type}`);
        }

        await Post.findByIdAndDelete(post_id, (err) => {
            if (err) console.log(err);
            console.log("Delete successful for generic Post");
        });

        res.status(200).send("Delete Post Success!")

    } catch (error) {
        return res.status(500).send("Error deleting post");
    }
});

module.exports = router;