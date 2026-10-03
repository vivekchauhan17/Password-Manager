
const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");

const passport = require("./config/passport.js");
const authRoutes = require("./routes/auth.js");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://password-manager-amber-seven.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyparser.json());
app.use(passport.initialize());

const client = new MongoClient(process.env.MONGO_URI);

const dbName = "passop";

// Connect MongoDB when server starts
async function startServer() {
  try {
    await client.connect();

    console.log("MongoDB connected successfully");

    const db = client.db(dbName);
    const collection = db.collection("Passwords");

    // Auth routes
    app.use("/Oauth", authRoutes);

    // GET passwords
    app.get("/", async (req, res) => {
      try {
        const passwords = await collection.find({}).toArray();
        res.json(passwords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
        res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
    });

    // POST password
    app.post("/", async (req, res) => {
      try {
        const password = req.body;

        const result = await collection.insertOne(password);

        res.json({
          success: true,
          result,
        });
      } catch (error) {
        console.error("Error saving password:", error);

        res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
    });

    // DELETE password
    app.delete("/", async (req, res) => {
      try {
        const password = req.body;

        const result = await collection.deleteOne({
          id: password.id,
        });

        res.json({
          success: true,
          result,
        });
      } catch (error) {
        console.error("Error deleting password:", error);

        res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
    });

    const port = process.env.PORT || 3000;

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();