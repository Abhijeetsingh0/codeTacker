const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/CodeTracker";

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (err) {
        console.log("Something went wrong: " + err);
    }
};
