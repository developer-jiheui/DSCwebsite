const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
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
        required: true
    },
    post_date: {
        type: String,
        required: true
    }
});

module.exports = News = mongoose.model("news", NewsSchema);