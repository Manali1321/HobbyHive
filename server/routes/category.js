const express = require('express');
const { Category } = require('../schema');

const categoryRoutes = express.Router();

// Category
categoryRoutes.get("/", async (req, res) => {
  try {
    const results = await Category.find({}).exec();
    res.send(results);

  } catch (error) {
    console.log('Error in category routes' + error);
  }
});
categoryRoutes.post("/add", async (req, res) => {
  try {
    console.log(req.body.name);
    const { name } = req.body;
    // save user information in mongodb
    await Category.create({
      name
    });
    res.json(Category)
  } catch (error) {
    console.log("Add Category error" + error);
  }
});
categoryRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var result = await Category.deleteOne({ _id: id }).exec();
    res.send(result);
    console.log("deleted");
  } catch (error) {
    console.log("Delete Category error" + error);
  }
});
// Category Update
categoryRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var result = await Category.findOne({ _id: id });
    res.send(result);

  } catch (error) {
    console.log("update get Category error" + error);

  }
});
categoryRoutes.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    var result = await Category.updateOne({ _id: id }, { name });
    console.log("cat updated");
    res.send(result)

  } catch (error) {
    console.log("update put Category error" + error);
  }
});
module.exports = categoryRoutes;