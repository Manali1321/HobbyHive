const express = require('express');
const { Seller, Buyer, User } = require('../schema');
const adminRoutes = express.Router();
adminRoutes.get("/seller/request", async (req, res) => {
  try {
    const results = await Seller.find({ status: "pending" }).populate('user').populate('service').exec();
    console.log(results);
    res.send(results);
  } catch (error) {
    console.log('Error in get pending seller routes' + error);
  }
});
adminRoutes.get("/seller", async (req, res) => {
  try {
    const results = await Seller.find({}).populate('user').populate('service').exec();
    console.log(results);
    res.send(results);
  } catch (error) {
    console.log('Error in get all seller routes' + error);
  }
});
adminRoutes.get("/buyer", async (req, res) => {
  try {
    const buyer = await Buyer.find().populate('user').populate('category').exec();
    console.log(buyer)
    res.send({ buyer });
  } catch (error) {
    console.log('Error in get all buyer routes' + error);
  }
});
module.exports = adminRoutes;