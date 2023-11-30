const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle the error
      return next(err);
    }
    // Custom logic after logout
    res.redirect("/");
  });
});

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect(`/owners/${req.user._id}`);
  }
);

// router.get('/logout', function(req, res){
//   req.logout(function(){
//     res.redirect('/');
//   });
// });

module.exports = router;
