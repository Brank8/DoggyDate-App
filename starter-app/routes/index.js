const express = require('express');
const router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});


router.get( '/login', function (req, res) {
  res.render('login', {title: 'Login'}) 
})


router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(`/owners/${req.user._id}`);
  }
);


router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

// router.get('/logout', function(req, res) {
//   req.logout()
//   req.session = null
//   res.redirect('/')
// })

module.exports = router;