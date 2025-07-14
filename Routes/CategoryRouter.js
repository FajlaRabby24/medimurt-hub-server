const express = require("express");
const {
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const CategoryRouter = express.Router();

CategoryRouter.post("/", createCategory);
CategoryRouter.delete("/:id", deleteCategory);

module.exports = CategoryRouter;
