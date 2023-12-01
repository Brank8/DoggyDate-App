const express = require('express');
const router = express.Router();
const dogsCtrl = require("../controllers/dogs")
const upload = require('../config/multer.js')



router.get('/owners/:id/dogs/new', dogsCtrl.new)
router.post('/owners/:id/dogs', upload.single('pictures'), dogsCtrl.create)
router.get('/owners/:ownerId/dogs/:dogId/edit', dogsCtrl.edit);
router.put('/owners/:ownerId/dogs/:dogId', dogsCtrl.update)
router.delete('/owners/:ownerId/dogs/:dogId', dogsCtrl.delete)

module.exports = router;
