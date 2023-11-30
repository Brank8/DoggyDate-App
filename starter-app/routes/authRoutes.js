const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);
router.get('/auth/google/logout', (req, res) => {
    // Perform logout logic, such as req.logout()
    // Redirect to the home page or wherever you want after logout
    res.redirect('/');
  });

module.exports = router;



