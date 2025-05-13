const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
    }
})

module.exports = mongoose.model("player", playerSchema)