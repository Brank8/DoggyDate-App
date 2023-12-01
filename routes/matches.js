const express = require('express');
const router = express.Router();
const matchCtrl = require("../controllers/matches")
 
router.get('/owners/:ownerId/dogs/:userDogId/matches', matchCtrl.index)
 
module.exports = router
