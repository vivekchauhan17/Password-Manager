const express = require('express');

const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
const passport = require('./config/passport.js')
const jwt = require("jsonwebtoken");


dotenv.config()
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'passop';
const port = 3000;
app.use(bodyparser.json())
// app.use(cors())

client.connect();

//get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
});

//save a password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult })
});

app.get(
  "/Oauth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

app.get(
  "/Oauth/google/callback",
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

    res.redirect(`http://localhost:5173`);
  }
);

// delete a passwprd by id
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult })
});


console.log(process.env.MONGO_URI)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});