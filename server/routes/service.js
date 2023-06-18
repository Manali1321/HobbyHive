const express = require('express');
const { Service } = require('../schema');

const serviceRoutes = express.Router();

// Service
serviceRoutes.get("/", async (req, res) => {
  try {
    const results = await Service.find({}).exec();
    res.send(results);

  } catch (error) {
    console.log('Error in Service routes' + error);
  }
});
serviceRoutes.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, category } = req.body;
    // save user information in mongodb
    await Service.create({
      name, image, category
    });
    res.json(Service);
  } catch (error) {
    console.log("Add Service error" + error);
  }
});
serviceRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var result = await Service.deleteOne({ _id: id }).exec();
    res.send(result);
    console.log("deleted");
  } catch (error) {
    console.log("Delete Service error" + error);
  }
});
// Service Update
serviceRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var result = await Service.findOne({ _id: id });
    res.send(result);

  } catch (error) {
    console.log("update get Service error" + error);

  }
});
serviceRoutes.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, image, category } = req.body;

    var result = await Service.updateOne({ _id: id }, { name, image, category });
    console.log("cat updated");
    res.send(result)

  } catch (error) {
    console.log("update put Service error" + error);
  }
});
module.exports = serviceRoutes;