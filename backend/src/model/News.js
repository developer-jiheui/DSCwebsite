const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    post_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = News = mongoose.model("news", NewsSchema);