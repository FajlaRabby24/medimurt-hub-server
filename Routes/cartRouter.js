const express = require("express");
const {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateQuantity,
  getAllPayments,
  acceptPayment,
} = require("../controllers/cartController");
const CartRouter = express.Router();

CartRouter.post("/", addToCart);
CartRouter.get("/", getUserCart);
CartRouter.get("/all-payments", getAllPayments);
CartRouter.delete("/clear", clearCart);
CartRouter.delete("/:id", removeCartItem);
CartRouter.patch("/accept-payment", acceptPayment);
CartRouter.patch("/:id", updateQuantity);

module.exports = CartRouter;
