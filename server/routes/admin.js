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
    // console.log(results);
    res.send(results);
  } catch (error) {
    console.log('Error in get all seller routes' + error);
  }
});
adminRoutes.get("/buyer", async (req, res) => {
  try {
    const buyer = await Buyer.find().populate('user').populate('category').exec();
    // console.log(buyer)
    res.send({ buyer });
  } catch (error) {
    console.log('Error in get all buyer routes' + error);
  }
});
adminRoutes.get("/list", async (req, res) => {
  try {
    const results = await User.find({ role: "admin" }).exec();
    res.send(results);

  } catch (error) {
    console.log('Error in admin to find admin routes' + error);
  }
});
adminRoutes.post('/add', async (req, res) => {
  try {
    // console.log(req.body)
    const { email } = req.body;

    // save user information in mongodb
    const user = await User.findOne({
      email
    })

    console.log(user)
    res.json(user)

  } catch (error) {
    console.log("🚀" + error)
  }
})
adminRoutes.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, phone, password } = req.body;
    var user = await User.updateOne({ _id: id }, {
      first_name, last_name, email, phone, password, role: "admin"
    });
    console.log({ user });
    res.send({ user })

  } catch (error) {
    console.log("update put Category error" + error);
  }
});
module.exports = adminRoutes;