const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

const passport = require('./config/passport.js');
const authRoutes = require('./routes/auth.js')

dotenv.config();

const app = express();


// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
}));


// Middleware
app.use(bodyparser.json());
app.use(passport.initialize());


// MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';
const port = 3000;

client.connect();


// Google OAuth Routes
app.use("/Oauth", authRoutes);


// Get all passwords
app.get('/', async (req, res) => {

  const db = client.db(dbName);
  const collection = db.collection('Passwords');

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});


// Save a password
app.post('/', async (req, res) => {

  const password = req.body;

  const db = client.db(dbName);
  const collection = db.collection('Passwords');

  const findResult = await collection.insertOne(password);

  res.send({
    success: true,
    result: findResult
  });
});


// Delete a password
app.delete('/', async (req, res) => {

  const password = req.body;

  const db = client.db(dbName);
  const collection = db.collection('Passwords');

  const findResult = await collection.deleteOne(password);

  res.send({
    success: true,
    result: findResult
  });
});


console.log(process.env.MONGO_URI);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});