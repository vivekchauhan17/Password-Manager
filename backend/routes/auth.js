const express = require("express");
const passport = require("../config/passport.js");
const jwt = require("jsonwebtoken");

const router = express.Router();


// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);


// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      {
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // After successful authentication
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);


module.exports = router;