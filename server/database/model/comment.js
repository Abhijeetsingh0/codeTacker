const mongoose = require("mongoose")

const commentShema = new mongoose.Schema({
    id:{
        type: String,
        require: true
    },
    comments: {
        type: {}
    }
})

module.exports = mongoose.model('comments',commentShema)