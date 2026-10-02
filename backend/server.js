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

// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);
const client = new MongoClient(process.env.MONGO_URI);

const dbName = "passop";
// const port = 3000;

client.connect();


// =========================
// Google OAuth Routes
// =========================

app.use("/Oauth", authRoutes);
app.use(passport.initialize());


// =========================
// Get all passwords
// =========================

app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Passwords");

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});


// =========================
// Save a password
// =========================

app.post("/", async (req, res) => {
  const password = req.body;

  const db = client.db(dbName);
  const collection = db.collection("Passwords");

  const findResult = await collection.insertOne(password);

  res.send({
    success: true,
    result: findResult,
  });
});


// =========================
// Delete a password
// =========================

app.delete("/", async (req, res) => {
  const password = req.body;

  const db = client.db(dbName);
  const collection = db.collection("Passwords");

  const findResult = await collection.deleteOne(password);

  res.send({
    success: true,
    result: findResult,
  });
});


// =========================
// Check MongoDB URI
// =========================

console.log(process.env.MONGO_URI);


// =========================
// Start Server
// =========================

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});