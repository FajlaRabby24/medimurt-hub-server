const express = require("express");
const {
  addToCart,
  getUserCart,
  removeCartItem,
  clearCart,
  updateQuantity,
  acceptPayment,
  updateCartAfterPayment,
  getAllPendingPayments,
} = require("../controllers/cartController");
const CartRouter = express.Router();

CartRouter.post("/", addToCart);
CartRouter.get("/", getUserCart);
CartRouter.get("/all-payments", getAllPendingPayments);
CartRouter.delete("/clear", clearCart);
CartRouter.delete("/:id", removeCartItem);
CartRouter.patch("/update", updateCartAfterPayment);
CartRouter.patch("/accept-payment", acceptPayment);
CartRouter.patch("/:id", updateQuantity);

module.exports = CartRouter;
