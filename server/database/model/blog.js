const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: [],
    },
    email: {
        type: String,
        required: true
    },
    quesId: {
        type: String
    },
    commentId: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('blog', blogSchema)