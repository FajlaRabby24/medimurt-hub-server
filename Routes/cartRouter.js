const express = require("express");
const {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateQuantity,
} = require("../controllers/cartController");
const CartRouter = express.Router();

CartRouter.post("/", addToCart);
CartRouter.get("/", getUserCart);
CartRouter.delete("/:id", removeCartItem);
CartRouter.delete("/clear", clearCart);
CartRouter.patch("/:id", updateQuantity);

module.exports = CartRouter;
