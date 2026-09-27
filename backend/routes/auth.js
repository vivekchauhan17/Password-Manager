const express = require("express");
const passport = require("../config/passport.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// =========================
// Google Login
// =========================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// =========================
// Google Callback
// =========================
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

// =========================
// Manual Email/Password Login
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Manual Login Email:", email);
    console.log("Manual Login Password:", password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Create JWT using the entered login details
    const token = jwt.sign(
      {
        email: email,
        loginType: "manual",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Manual login successful");

    res.json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Manual login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
