const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema ({
    
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player",
        required: true
    },
    minute: {
        type: Number,
        required: true,
    },
    event: {
        type: String,
        enum: ["yellow card", "red card", "goal", "assist"]
    }
    
})

module.exports = mongoose.model("event", eventSchema);