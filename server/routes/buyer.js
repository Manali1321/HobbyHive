const express = require('express');
const { User, Buyer } = require('../schema');

const buyerRoutes = express.Router();

// /buyer

buyerRoutes.post('/signup', async (req, res) => {
  try {
    // console.log(req.body)
    const { first_name, last_name, email, phone, password = 'buyer', category } = req.body;

    // save user information in mongodb
    const user = await User.create({
      first_name, last_name, email, phone, password, role: "buyer"
    })

    // save buyer information in mongodb
    const buyer = await Buyer.create({
      user: user._id,
      category
    })
    console.log(buyer)
    res.json(buyer)

  } catch (error) {
    console.log("🚀 ~ file: index.js:13 ~ buyerRoutes.post ~ error:", error)
  }
})
// Pass userID
buyerRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var buyer = await Buyer.findOne({ user: id });
    var user = await User.findOne({ _id: id });
    const buyerData = {
      buyer, user
    }
    console.log(buyerData)
    res.send(buyerData);
  } catch (error) {
    console.log("update get buyer error" + error);
  }
});
// Pass userID

buyerRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var buyer = await Buyer.deleteOne({ user: id }).exec();
    console.log(buyer);

    var user = await User.deleteOne({ _id: id }).exec();
    console.log(user);

    //res.send(buyer, user);
    console.log("deleted");
  } catch (error) {
    console.log("Delete Category error" + error);
  }
});
// Pass userID
buyerRoutes.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, phone, password = 'buyer', category } = req.body;

    var user = await User.updateOne({ _id: id }, {
      first_name, last_name, email, phone, password, role: "buyer"
    });
    var buyer = await Buyer.updateOne({ user: id }, {
      category
    })
    console.log({ user, buyer });
    res.send({ user, buyer })

  } catch (error) {
    console.log("update put Category error" + error);
  }
});



module.exports = buyerRoutes