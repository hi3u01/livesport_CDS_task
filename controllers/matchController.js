const Match = require("../models/matchModel");
const Team = require("../models/teamModel")

exports.getAll = async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.get = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
        res.json(match)

        if(!match){
            return res.status(400).json({messsage: "match does not exist"})
        }
    } catch (error) {
        return res.status(500).json({message: error.mmessage})
    }
}

exports.add = async(req, res) => {
    try{
    const match = new Match({
       date: req.body.date,
       homeTeam: req.body.homeTeam,
       awayTeam: req.body.awayTeam,
       events: req.body.events
    });

    const homeTeam = await Team.findById(match.homeTeam);
    const awayTeam = await Team.findById(match.awayTeam);
    
    if (!homeTeam || !awayTeam) {
        return res.status(400).json({ message: "one or both teams not found" });
    }

    const newMatch = await match.save()   
    res.status(201).json(newMatch)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

exports.patch = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
        if(!match){
            return res.status(400).json({messsage: "match does not exist"})
        }
    if (req.body.homeTeam != null && req.body.homeTeam != undefined) {
        match.homeTeam = req.body.homeTeam
    }
    if (req.body.awayTeam != null && req.body.awayTeam != undefined) {
        match.awayTeam = req.body.awayTeam
    }
     if (req.body.date != null && req.body.date != undefined) {
        match.date = req.body.date
    }
    if (req.body.score != null && req.body.score != undefined) {
        match.score = req.body.score
    }
    const updatedMatch = await match.save();
    res.json(updatedMatch)
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}

exports.remove = async(req, res) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id)
        if(!match){
            return res.status(400).json({message: "match does not exist"})
        }
        res.json({message: "match deleted"})
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}
