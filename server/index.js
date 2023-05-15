// Import module
const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

// Mongo config
const uri = "mongodb+srv://Manali1321:Arman1321@hobbyhive.kfghu4m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Enable CORS middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 8888;

// Router
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
app.get("/seller", async (request, response) => {
  const seller = await sellerData();
  response.send(seller);
});
app.get("/employer", async (req, res) => {
  const employer = await employerData();
  res.send(employer);
});

// Function
async function connection() {
  try {
    await client.connect();
    //console.log('connected');
    var db = client.db('hive');
    //console.log(db);
    return db;
  } catch (error) {
    console.log("i got this: " + error);
  }
}

async function sellerData() {
  var db = await connection();
  var collection = db.collection('seller')
  var results = await collection.find({}).limit(4).toArray();
  return results;
}
async function employerData() {
  var db = await connection();
  var collection = db.collection('buyer')
  var results = await collection.find({}).toArray();
  return results;
}