const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
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
    event_date: {
        type: Date,
        required: true
    },
    post_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Event = mongoose.model("event", EventSchema);