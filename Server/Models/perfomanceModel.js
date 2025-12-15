const mongoose = require("mongoose");

const perfomanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Contest'
    },
    score: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const perfomanceModel = mongoose.model("Perfomance" , perfomanceSchema);
module.exports = perfomanceModel;