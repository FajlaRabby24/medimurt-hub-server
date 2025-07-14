const express = require("express");
const {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateQuantity,
  updateCartAfterPayment,
} = require("../controllers/cartController");
const CartRouter = express.Router();

CartRouter.post("/", addToCart);
CartRouter.get("/", getUserCart);
CartRouter.delete("/clear", clearCart);
CartRouter.delete("/:id", removeCartItem);
CartRouter.patch("/update", updateCartAfterPayment);

CartRouter.patch("/:id", updateQuantity);

module.exports = CartRouter;
