const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connected to Databese'))

app.use(express.json())
const PORT = 3000
app.listen(PORT, () => console.log( `[SERVER] Started on port ${PORT}`))