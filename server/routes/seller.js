const express = require('express');
const { User, Seller } = require('../schema');

const sellerRoutes = express.Router();

// /seller

sellerRoutes.post('/signup', async (req, res) => {
  try {
    // console.log(req.body)
    const { first_name, last_name, email, phone, password, resume, seller_image, portfolio, service, workpermit, sin, business_number } = req.body;

    // save user information in mongodb
    const user = await User.create({
      first_name, last_name, email, phone, password, role: "seller"
    })

    // save seller information in mongodb
    const seller = await Seller.create({
      user: user._id,
      status: 'pending',
      seller_image, service, workpermit, sin, business_number
      // , portfolio, resume
    })
    console.log(seller)
    res.json(seller)

  } catch (error) {
    console.log("🚀 ~ file: index.js:13 ~ sellerRoutes.post ~ error:", error)
  }
})
// Pass userID
sellerRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var seller = await Seller.findOne({ user: id }).populate('user').populate('service').exec();
    // const sellerData = {
    //   seller, user
    // }
    console.log(seller)
    res.send(seller);
  } catch (error) {
    console.log("Get for seller error" + error);
  }
});
// Pass userID

sellerRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var seller = await Seller.deleteOne({ user: id }).exec();
    console.log(seller);

    var user = await User.deleteOne({ _id: id }).exec();
    console.log(user);

    //res.send(seller, user);
    console.log("deleted");
  } catch (error) {
    console.log("Delete Seller error" + error);
  }
});
// Pass userID
sellerRoutes.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, email, phone, password, resume, seller_image, portfolio, service, workpermit, sin, status } = req.body;
    var user = await User.updateOne({ _id: id }, {
      first_name, last_name, email, phone, password
    });
    var seller = await Seller.updateOne({ user: id }, {
      user: user._id, status,
      seller_image, portfolio, service, workpermit, sin, resume
    })
    console.log({ user, seller });
    res.send({ user, seller })

  } catch (error) {
    console.log("Update on seller" + error);
  }
});



module.exports = sellerRoutes