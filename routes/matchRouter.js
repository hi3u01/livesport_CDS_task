const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

//get all
router.get('/list', matchController.getAll);

//get a match
router.get("/:id", matchController.get)

//create a match
router.post("/create", matchController.add)

//update a match
router.patch('/update/:id', matchController.patch)

//delete a match
router.delete('/delete/:id', matchController.remove)

module.exports = router;