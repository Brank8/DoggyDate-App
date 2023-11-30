const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Owner = require('../models/owner');
const session = require('express-session');

module.exports = function (app) {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function(accessToken, refreshToken, profile, cb) {
      console.log('Google Profile:', profile);
      try {
        let user = await Owner.findOne({ googleId: profile.id });
        if (user) {
          console.log('Existing User:', user);
          return cb(null, user);
        }
        user = await Owner.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        });
        console.log('New User:', user);
        return cb(null, user);
      } catch (err) {
        console.error('Error during OAuth process:', err);
        return cb(err);
      }
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(async function(ownerId, cb) {
    cb(null, await Owner.findById(ownerId));
  });

  // app.use(session({
  //   secret: process.env.SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: false }, // Set to true if using https
  // }));

  // app.use(passport.initialize());
  // app.use(passport.session());
};