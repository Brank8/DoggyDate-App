const express = require('express');
const router = express.Router();
const ownersCtrl = require("../controllers/owners")
const ensure = require('../config/ensure-logged-in')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/new", ownersCtrl.new);

router.post("/",ownersCtrl.create);

router.get('/:id', ensure, ownersCtrl.show)

module.exports = router;