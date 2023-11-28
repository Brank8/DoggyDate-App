const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.get("/", usersCtrl.getAllDogs);

module.exports = router;