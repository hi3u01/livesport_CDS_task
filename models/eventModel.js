const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema ({
    matchId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"match",
        required: true
    },
    player: {
        type: String,
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