const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

//get all
router.get('/list', eventController.getAll);

//get a event
router.get("/:id", eventController.get)

//create a event
router.post("/create", eventController.add)

//update a event
router.patch('/update/:id', eventController.patch)

//delete a event
router.delete('/delete/:id', eventController.remove)

module.exports = router;