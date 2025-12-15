const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    problems: [{
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            requried: true
        },
        correct: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

const Contest = mongoose.model("Contest", contestSchema);
module.exports = Contest;