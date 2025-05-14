const Team = require("../models/teamModel");


exports.getAll = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.get = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        res.json(team)

        if(team == null){
            return res.status(400).json({messsage: "team does not exist"})
        }
    } catch (error) {
        return res.status(500).json({message: error.mmessage})
    }
}

exports.add = async(req, res) => {
    try{
    const team = new Team({
       name: req.body.name,
       players: req.body.players
    });

    const newTeam = await team.save()   
    res.status(201).json(newTeam)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

exports.patch = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
        if(team == null){
            return res.status(400).json({messsage: "team does not exist"})
        }
    if (req.body.name != null && req.body.name != undefined) {
        team.name = req.body.name
    }
    if (req.body.players != null && req.body.players != undefined) {
        team.players.push(req.body.players)
    }
        const updatedTeam = await team.save();
        res.json(updatedTeam)
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}

exports.remove = async(req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id)
        if(team == null){
            return res.status(400).json({message: "team does not exist"})
        }
        res.json({message: "team deleted"})
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}
