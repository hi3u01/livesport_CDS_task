const mongoose = require('mongoose');
const Event = require('./models/eventModel');
const Match = require ('./models/matchModel');
const Team = require("./models/teamModel");

mongoose.connect('mongodb://localhost:27017/livesport_CBS') 


async function matchSimulation(){
    try {
    const homeTeam = await Team.findOne({name:"FC Barcelona"})
    const awayTeam = await Team.findOne({name:"Real Madrid"})
    console.log(`El Clásico\n${new Date()}\n${homeTeam.name} vs. ${awayTeam.name}`)

    //save match info
    const newMatch = new Match({
      date: new Date(),
      homeTeam: homeTeam._id,
      awayTeam: awayTeam._id,
      score: {homeScore: 0 ,awayScore: 0}, 
      events: []
    });

    const match = await newMatch.save();
    const Events = []

    const sentOffPlayers = new Set();

    const randomMinute = () => Math.floor(Math.random()*90) + 1;
    
    //get random player without red card
    const getRandomPlayer = (team) => {
      const randomPlayers = team.players.filter(p => !sentOffPlayers.has(p.name));
      return randomPlayers.length > 0 ? randomPlayers[Math.floor(Math.random() * randomPlayers.length)] : null
    };

    //generating goals
    for (let i = 0; i < 5; i++){
      const scoringTeam = Math.random() > 0.5 ? homeTeam : awayTeam;
      const scoringPlayer = getRandomPlayer(scoringTeam);
      if (!scoringPlayer) continue;

      const goal = new Event({
        matchId: newMatch._id,
        player: scoringPlayer.name,
        minute: randomMinute(),
        event: "goal"
      })
      await goal.save();
      Events.push(goal)

      if (scoringTeam._id.equals(homeTeam._id)) {
        match.score.homeScore++;
      } else {
        match.score.awayScore++
      }
    }

    //generating red card
    for (let i = 0; i < 1; i++){
      const faulingTeam = Math.random() > 0.5 ? homeTeam : awayTeam;
      const faulingPlayer = getRandomPlayer(faulingTeam);
      if (!faulingPlayer) continue;

      const redCard = new Event({
        matchId: newMatch._id,
        player: faulingPlayer.name,
        minute: randomMinute(),
        event: "red card"
      })
      await redCard.save();
      Events.push(redCard)
      sentOffPlayers.add(faulingPlayer.name);
    }

    // generating yellow cards
    for (let i = 0; i < 4; i++){
      const faulingTeam = Math.random() > 0.5 ? homeTeam : awayTeam;
      const faulingPlayer = getRandomPlayer(faulingTeam);
      if (!faulingPlayer) continue;

      const yellowCard = new Event({
        matchId: newMatch._id,
        player: faulingPlayer.name,
        minute: randomMinute(),
        event: "yellow card"
      })
      await yellowCard.save();
      Events.push(yellowCard)
    }

    //saving event datas to the match
    match.events.push(...Events.map(e => e._id))
    await match.save(); 

    const sortEvents = await Event.find({ matchId: match._id}).sort({minute: 1})
    sortEvents.forEach(event =>{
      console.log(`${event.minute}' - ${event.player} (${event.event})`)
    })
    console.log(`Final score ${newMatch.score.homeScore} : ${newMatch.score.awayScore} `)
    } catch (error){
        return console.error()
    }
}
matchSimulation()
