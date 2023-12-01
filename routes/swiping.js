const express = require('express');
const router = express.Router();
const swipeCtrl = require("../controllers/swipe")
 
router.get('/owners/:ownerId/dogs/:dogId/swipe', swipeCtrl.startSwiping);
router.post('/owners/:ownerId/dogs/:userDogId/like/:likedDogId', swipeCtrl.like);
router.post('/owners/:ownerId/dogs/:userDogId/dislike/:dislikedDogId', swipeCtrl.dislike);
 


  
module.exports = router
