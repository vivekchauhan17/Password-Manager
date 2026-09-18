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

    // Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Connect to MongoDB
    const { MongoClient } = require("mongodb");

    const client = new MongoClient("mongodb://localhost:27017");

    await client.connect();

    const db = client.db("passop");

    // We will store users in this collection
    const usersCollection = db.collection("Users");

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      await client.close();

      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      await client.close();

      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await client.close();

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
