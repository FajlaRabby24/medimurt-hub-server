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
const { verifyFBToken } = require("../middleware/verifyFBToken");
const UserRouter = express.Router();

UserRouter.get("/advertisements/active", getActiveAd);

UserRouter.post("/", createOrUpdateUser);

UserRouter.get("/categories", getAllCategories);

UserRouter.get("/medicines/discounted", getDiscountedMedicines);
UserRouter.get("/medicines", getAllMedicines);
UserRouter.get("/medicines/category/:category", getAllMedicineByCategory);

UserRouter.get("/cart", verifyFBToken, getUserCart);
UserRouter.post("/add-to-cart", verifyFBToken, addToCart);
UserRouter.patch("/cart/update", verifyFBToken, updateCartAfterPayment);
UserRouter.patch("/cart/:id", verifyFBToken, updateQuantity);
UserRouter.delete("/cart/clear", verifyFBToken, clearCart);
UserRouter.delete("/cart/:id", verifyFBToken, removeCartItem);

UserRouter.get("/:email/role", verifyFBToken, getUserRollByEmail);
UserRouter.get("/payment-history", verifyFBToken, getUserPaymentHistory);

module.exports = UserRouter;
