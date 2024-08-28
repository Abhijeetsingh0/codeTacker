const mongoose = require("mongoose");



const codeTrackerSchema = new mongoose.Schema({
    quesLink: {
        type: String,
        required: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    programingLanguage: {
        type: String,
        required: true
    }
    ,
    solution: {
        type: String,
        required: true
    },
    tags: {
        type: [],
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const codeTrack = mongoose.model("codeTrack", codeTrackerSchema)

module.exports = codeTrack


// exmple data
// {
//     "quesLink": "https://example.com/problem/123",
//     "problemStatement": "Write a function to reverse a string.",
//     "programingLanguage": "python",
//     "solution": "function reverseString(str) { return str.split('').reverse().join(''); }",
//     "tags": ["string", "algorithm", "beginner"],
//     "email": "user@example.com"
// }
