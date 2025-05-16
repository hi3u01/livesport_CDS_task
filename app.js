const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/livesport_CBS");

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to Database'));

app.use(express.json());

const teamRouter = require('./routes/teamRouter');
const matchRouter = require('./routes/matchRouter');
const eventRouter = require('./routes/eventRouter');

app.use('/teams', teamRouter);
app.use('/matches', matchRouter);
app.use('/events', eventRouter);

const PORT = 3000;
app.listen(PORT, () => console.log( `[SERVER] Started on port ${PORT}`));