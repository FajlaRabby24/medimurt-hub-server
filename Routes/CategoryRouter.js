const express = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const CategoryRouter = express.Router();

CategoryRouter.get("/", getAllCategories);
CategoryRouter.post("/", createCategory);
CategoryRouter.patch("/:id", updateCategory);
CategoryRouter.delete("/:id", deleteCategory);

module.exports = CategoryRouter;
