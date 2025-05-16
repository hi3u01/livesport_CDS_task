const event = require("../models/eventModel");
const Match = require("../models/matchModel")
const Team = require("../models/teamModel")

exports.getAll = async (req, res) => {
    try {
        const events = await event.find();
        res.json(events)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.get = async (req, res) => {
    try {
        const Event = await event.findById(req.params.id)
        res.json(Event)

        if(!Event){
            return res.status(400).json({messsage: "event does not exist"})
        }
    } catch (error) {
        return res.status(500).json({message: error.mmessage})
    }
}

exports.add = async (req, res) => {
  try {
    const { matchId, player, minute, event: eventType } = req.body;
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(400).json({ message: "match not found" });
    }

    const homeTeam = await Team.findById(match.homeTeam);
    const awayTeam = await Team.findById(match.awayTeam);

    if (!homeTeam || !awayTeam) {
      return res.status(400).json({ message: "one or both teams not found" });
    }

    const allPlayers = [...homeTeam.players, ...awayTeam.players];
    const playerExists = allPlayers.some(p => p.name === player);

    if (!playerExists) {
      return res.status(400).json({
        message: "Player is not part of the home or away team"
      });
    }

    const newEvent = new event({
      matchId,
      player,
      minute,
      event: eventType
    });

    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.patch = async (req, res) => {
    try {
    const Event = await event.findById(req.params.id)
    if(!Event){
        return res.status(400).json({messsage: "event does not exist"})
    }
    if (req.body.metchId != null && req.body.metchId != undefined) {
        Event.matchId = req.body.metchId
    }
    if (req.body.player != null && req.body.player != undefined) {
        Event.player = req.body.player
    }
     if (req.body.minute != null && req.body.minute != undefined) {
        Event.minute = req.body.minute
    }
    if (req.body.event != null && req.body.event != undefined) {
        Event.event = req.body.event
    }
        const updatedEvent = await Event.save();
        res.json(updatedEvent)
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}

exports.remove = async(req, res) => {
    try {
        const Event = await event.findByIdAndDelete(req.params.id)
        if(!Event){
            return res.status(400).json({message: "event does not exist"})
        }
        res.json({message: "event deleted"})
    }catch (error){
        res.status(400).json({ message: error.message })
    }
}
