// Import module
const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

// Mongo config
const uri = "mongodb+srv://Manali1321:Arman1321@hobbyhive.kfghu4m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


const port = process.env.PORT || 8888;

// Router
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
app.get("/data", async (request, response) => {
  const seller = await sellerData();
  response.send(seller);
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