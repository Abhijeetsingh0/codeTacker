const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
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