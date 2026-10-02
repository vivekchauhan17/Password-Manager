const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

const passport = require("./config/passport.js");
const authRoutes = require("./routes/auth.js");

dotenv.config();

const app = express();


// =========================
// CORS
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",

      // Replace this with your actual Vercel frontend URL
      "https://your-frontend.vercel.app"
    ],
    credentials: true,
  })
);


// =========================
// Middleware
// =========================

app.use(bodyparser.json());
app.use(passport.initialize());


// =========================
// MongoDB
// =========================

const client = new MongoClient(process.env.MONGO_URI);

const dbName = "passop";


// =========================
// Google OAuth Routes
// =========================

app.use("/Oauth", authRoutes);


// =========================
// Get all passwords
// =========================

app.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    const findResult = await collection.find({}).toArray();

    res.json(findResult);
  } catch (error) {
    console.error("Error fetching passwords:", error);

    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});


// =========================
// Save a password
// =========================

app.post("/", async (req, res) => {
  try {
    const password = req.body;

    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    const findResult = await collection.insertOne(password);

    res.send({
      success: true,
      result: findResult,
    });
  } catch (error) {
    console.error("Error saving password:", error);

    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});


// =========================
// Delete a password
// =========================

app.delete("/", async (req, res) => {
  try {
    const password = req.body;

    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    const findResult = await collection.deleteOne(password);

    res.send({
      success: true,
      result: findResult,
    });
  } catch (error) {
    console.error("Error deleting password:", error);

    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});


// =========================
// Start Server
// =========================

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});