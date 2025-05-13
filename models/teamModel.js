const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    players: [{
        
        name:{
            type:String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        }

    }],
});

module.exports = mongoose.model("team", teamSchema)