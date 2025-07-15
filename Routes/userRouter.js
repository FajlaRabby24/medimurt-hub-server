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
  updateUserProfile,
} = require("../controllers/userControllers");
const { verifyFBToken } = require("../middleware/verifyFBToken");
const verifyUser = require("../middleware/verifyUser");
const verifyEmail = require("../middleware/verifyEmail");
const UserRouter = express.Router();

UserRouter.get(
  "/role",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  getUserRollByEmail
);
UserRouter.get("/advertisements/active", getActiveAd);

UserRouter.post("/", createOrUpdateUser);

UserRouter.get("/categories", getAllCategories);

UserRouter.get("/medicines/discounted", getDiscountedMedicines);
UserRouter.get("/medicines", getAllMedicines);
UserRouter.get("/medicines/category/:category", getAllMedicineByCategory);

UserRouter.get("/cart", verifyFBToken, verifyEmail, verifyUser, getUserCart);
UserRouter.post(
  "/add-to-cart",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  addToCart
);
UserRouter.patch(
  "/cart/update",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  updateCartAfterPayment
);
UserRouter.patch(
  "/cart/:id",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  updateQuantity
);
UserRouter.delete(
  "/cart/clear",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  clearCart
);
UserRouter.delete(
  "/cart/:id",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  removeCartItem
);

UserRouter.get(
  "/payment-history",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  getUserPaymentHistory
);

UserRouter.patch(
  "/update-profile",
  verifyFBToken,
  verifyEmail,
  verifyUser,
  updateUserProfile
);

module.exports = UserRouter;
