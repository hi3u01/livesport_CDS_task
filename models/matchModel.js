const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema ({

    date: {
        type: Date,
        required: true
    },
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        required: true
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        required: true
    },    
    score: {

        homeScore:{
            type: Number,
            required: true
        },
        awayScore: {
            type: Number,
            required: true
        }
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",

    }]
})

module.exports = mongoose.model("match", matchSchema);
