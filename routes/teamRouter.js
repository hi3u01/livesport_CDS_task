const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

//get all
router.get('/list', teamController.getAll);

//get a team
router.get("/:id", teamController.get)

//create a team
router.post("/create", teamController.add)

//update a team
router.patch('/update/:id', teamController.patch)

//delete a team
router.delete('/delete/:id', teamController.remove)

module.exports = router;