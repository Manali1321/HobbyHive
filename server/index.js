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
// Convert form data in to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
// Read
app.get("/seller", async (request, response) => {
  const seller = await sellerData();
  response.send(seller);
});
app.get("/employer", async (req, res) => {
  const employer = await employerData();
  res.send(employer);
});
app.get("/category", async (req, res) => {
  const category = await categoryData();
  res.send(category);
});
app.get("/service", async (req, res) => {
  const service = await serviceData();
  res.send(service);
});
// Add
app.post("/category/add", async (req, res) => {
  let newCategory = {
    name: req.body.name,
    service: req.body.service
  }
  await AddCategory(newCategory);
});
app.post("/service/add", async (req, res) => {
  let newService = {
    name: req.body,
  }
  await AddService(newService.name);
});
// Delete
app.delete("/category/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await DeleteCategory(id);
})
app.delete("/service/delete/:id", async (req, res) => {
  const id = req.params.id;
  await DeleteService(id);
})
// Login
app.post("/login", async (req, res) => {
  const credential = req.body;

  // console.log(res);
  var db = await connection();
  var collection = db.collection('buyer')
  try {
    var check = await collection.findOne({ email: credential.email })
    if (check.password == credential.password) {
      console.log("Good to go");
      res.send("Good to go")
    } else {
      console.log("wrong password");
      res.send("wrong password")
    }
  } catch (error) {
    res.send("wrong details")
    console.error(error)
  }
}
);

// Function
async function connection() {
  try {
    await client.connect();
    var db = client.db('hive');
    return db;
  } catch (error) {
    console.log("i got this: " + error);
  }
}
// Read
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
async function categoryData() {
  var db = await connection();
  var collection = db.collection('category')
  var results = await collection.find({}).toArray();
  return results;
}
async function serviceData() {
  var db = await connection();
  var collection = db.collection('service')
  var results = await collection.find({}).toArray();
  return results;
}
// Add
async function AddCategory(newCategory) {
  var db = await connection();
  var collection = db.collection('category');
  var result = await collection.insertOne(newCategory);
  console.log("cat added");
}
async function AddService(newService) {
  var db = await connection();
  var collection = db.collection('service');
  var result = await collection.insertOne(newService);
  console.log("service added");
}
// Update
// Delete
async function DeleteCategory(id) {
  var db = await connection();
  var collection = db.collection("category");
  var result = await collection.deleteOne({ _id: ObjectId(id) });
  console.log("deleted");
}
async function DeleteService(id) {
  var db = await connection();
  var collection = db.collection("service");
  var result = await collection.deleteOne({ _id: ObjectId(id) });
  console.log("deleted");
}
// Credential Check



// Get List of country
// page route
app.get('/signup', async (request, response) => {
  var country = await countryData();
  response.send(country);
});

async function countryData() {
  const countriesnow_URL = "https://countriesnow.space/api/v0.1/countries/"; //base URL for any countriesnow_URL API requests
  let requrl = `${countriesnow_URL}`;
  let response = await fetch(requrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let countriesnow_URLData = await response.json();
  return countriesnow_URLData.data;
}