const express = require("express");
const {
  getSalesSummaryForAdmin,
  getAllAdvetisements,
  getAllUser,
  getAllCategories,
  getAllPendingPayments,
  getSalesData,
  updateAdStatus,
  updateUserRole,
  updateCategory,
  acceptPayment,
  createCategory,
  deleteCategory,
} = require("../controllers/adminController");
const { verifyFBToken } = require("../middleware/verifyFBToken");
const AdminRouter = express.Router();

AdminRouter.get("/advertisements", verifyFBToken, getAllAdvetisements);
AdminRouter.patch("/advertisements/:id", verifyFBToken, updateAdStatus);

AdminRouter.patch("/update-user-role/:id", verifyFBToken, updateUserRole);
AdminRouter.get("/manage-users", verifyFBToken, getAllUser);

AdminRouter.get("/cart/all-payments", verifyFBToken, getAllPendingPayments);
AdminRouter.patch("/cart/accept-payment", verifyFBToken, acceptPayment);

AdminRouter.get("/sales", verifyFBToken, getSalesData);
AdminRouter.get("/sales-summary", verifyFBToken, getSalesSummaryForAdmin);

AdminRouter.patch("/categories/:id", verifyFBToken, updateCategory);
AdminRouter.get("/categories", verifyFBToken, getAllCategories);
AdminRouter.post("/categories", verifyFBToken, createCategory);
AdminRouter.delete("/categories/:id", verifyFBToken, deleteCategory);

module.exports = AdminRouter;
