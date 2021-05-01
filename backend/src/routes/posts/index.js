const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../model/Post");
const Event = require("../../model/Event");
const News = require("../../model/News");
const config = require("config");
const auth = require('../../middleware/auth');

/*
 * @route   GET /posts/events
 * @desc    Posts routing to get all Events
 * @access  Public
 */
router.get("/events", async (req, res) => {
    try {
        let posts = await Event.find().sort([['post_date', -1]]);       
        res.status(200).json({
            message: `Retrived ${posts.length} posts of type Event`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/events/featured
 * @desc    Posts routing to get all featured Events
 * @access  Public
 */
router.get("/events/featured", async (req, res) => {
    try {
        let posts = await Event.find({is_featured: true}).sort([['post_date', -1]]);       
        res.status(200).json({
            message: `Retrived ${posts.length} posts of featured Events`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/events/:id
 * @desc    Posts routing to get a specific Event
 * @access  Public
 */

router.get("/events/:id", async (req, res) => {
    const post_id = req.params.id;
    try {
        let posts = await Event.find({_id: post_id});       
        res.status(200).json({
            message: `Retrived event ${post_id}`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});


/*
 * @route   GET /posts/news
 * @desc    Posts routing to get all News
 * @access  Public
 */
router.get("/news", async (req, res) => {
    console.log(req.params);
    try {
        let posts = await News.find().sort([['post_date', -1]]);
        res.status(200).json({
            message: `Retrived ${posts.length} posts of type News`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/news/featured
 * @desc    Posts routing to get all featured News
 * @access  Public
 */
router.get("/news/featured", async (req, res) => {
    try {
        let posts = await News.find({is_featured: true}).sort([['post_date', -1]]);
        res.status(200).json({
            message: `Retrived ${posts.length} posts of featured News`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

/*
 * @route   GET /posts/news/:id
 * @desc    Posts routing to get a specific News item
 * @access  Public
 */

router.get("/news/:id", async (req, res) => {
    const post_id = req.params.id;
    try {
        let posts = await News.find({_id: post_id});       
        res.status(200).json({
            message: `Retrived news item ${post_id}`,
            data: posts
        });
    } catch (error) {
        return res.status(500).send("An error occured retrieving posts!");
    }
});

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
            let d = new Date(event_date);
            d = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
            switch (post_type) {
                case "Event":
                    newPost = new Event({
                        post_id: post,
                        title,
                        description,
                        is_featured,
                        is_countdown,
                        event_date: d
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
router.put("/news", auth, async (req, res) => {
        const { id, data } = req.body;

        let updatedPost;
        try {
            updatedPost = await News.findOneAndUpdate({ _id: id }, data, { new: true, useFindAndModify: false });
        } catch (error) {
            console.log(error);
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
router.put("/event", auth, async (req, res) => {
        const { id, data } = req.body;
        let updatedPost;
        try {
            let d = new Date(data.event_date);
            data.event_date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
            updatedPost = await Event.findOneAndUpdate({ _id: id }, data, { new: true,useFindAndModify: false });
        } catch (error) {
            return res.status(500).send("Error saving event!");
        }

        res.status(200).send({
            message: "Saving Event Post Success!",
            data: updatedPost
        });
    });

/*
 * @route   DELETE /posts
 * @desc    Posts routing to delete a post
 * @access  Public
 */
router.delete("/", auth, async (req, res) => {
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

        res.status(200).send("Delete Post Success!");

    } catch (error) {
        return res.status(500).send("Error deleting post");
    }
});

module.exports = router;