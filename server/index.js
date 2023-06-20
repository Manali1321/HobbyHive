// Import module
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors')
const mongoose = require("mongoose");
const path = require("path");
const multer = require('multer');
const { Service, Category, User, Buyer, Seller } = require('./schema');

// Routes
const categoryRoutes = require('./routes/category');
const serviceRoutes = require('./routes/service');
const buyerRoutes = require('./routes/buyer');
const sellerRoutes = require('./routes/seller');
const adminRoutes = require('./routes/admin');

// Mongo config
const uri = "mongodb+srv://Manali1321:Arman1321@hobbyhive.kfghu4m.mongodb.net/?retryWrites=true&w=majority";

// middleware
// body-parser - for parsing json data
app.use(express.json());
// morgan - for logging
app.use(morgan("tiny"));
app.use(cors())


const port = process.env.PORT || 8888;

// Convert form data in to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
  limit: '10mb'
}));

// Router
app.use('/admin/category', categoryRoutes);
app.use('/admin/service', serviceRoutes);
app.use('/buyer', buyerRoutes);
app.use('/seller', sellerRoutes);
app.use('/admin', adminRoutes);

// Connection
const connection = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
    // return db;
  } catch (error) {
    console.log("i got this: " + error);
  }
}
connection();


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
app.post("/seller/login", async (req, res) => {
  const credential = req.body;

  // console.log(res);
  var db = await connection();
  var collection = db.collection('seller')
  try {
    var check = await collection.findOne({ email: credential.email })
    if (check.password === credential.password) {
      console.log("Good to go");
      if (check.role_id == "2") {
        console.log("user is seller");
        res.send([true, check._id]);
      } else if (check.role_id == "4") {
        console.log("user is waiting for approval");
        res.send([false, check._id])
      }
    } else {
      res.send(["wrong details", check._id])
    }
  } catch (error) {
    res.send(error)
    console.error(error)
  }
}
);
