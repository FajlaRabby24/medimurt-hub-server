const express = require("express");
const {
  createOrUpdateUser,
  getUserRollByEmail,
  getUserPaymentHistory,
  getAllCategories,
  getActiveAd,
  getDiscountedMedicines,
  getAllMedicines,
  addToCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  getUserCart,
  updateCartAfterPayment,
  getAllMedicineByCategory,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.get("/advertisements/active", getActiveAd);
UserRouter.post("/", createOrUpdateUser);
UserRouter.get("/payment-history", getUserPaymentHistory);
UserRouter.get("/:email/role", getUserRollByEmail);
UserRouter.get("/categories", getAllCategories);
UserRouter.get("/medicines/discounted", getDiscountedMedicines);
UserRouter.get("/medicines", getAllMedicines);
UserRouter.get("/medicines/category/:category", getAllMedicineByCategory);

UserRouter.post("/add-to-cart", addToCart);
UserRouter.patch("/cart/update", updateCartAfterPayment);
UserRouter.patch("/cart/:id", updateQuantity);
UserRouter.delete("/cart/clear", clearCart);
UserRouter.delete("/cart/:id", removeCartItem);
UserRouter.get("/cart", getUserCart);

module.exports = UserRouter;
