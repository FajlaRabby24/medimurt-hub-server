const express = require("express");
const { addToCart } = require("../controllers/cartController");
const CartRouter = express.Router();

CartRouter.post("/", addToCart);

module.exports = CartRouter;
