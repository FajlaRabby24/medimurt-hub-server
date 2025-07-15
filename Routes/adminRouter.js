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

const AdminRouter = express.Router();

AdminRouter.get("/advertisements", getAllAdvetisements);
AdminRouter.patch("/advertisements/:id", updateAdStatus);

AdminRouter.patch("/update-user-role/:id", updateUserRole);
AdminRouter.get("/manage-users", getAllUser);

AdminRouter.get("/cart/all-payments", getAllPendingPayments);
AdminRouter.patch("/cart/accept-payment", acceptPayment);

AdminRouter.get("/sales", getSalesData);
AdminRouter.get("/sales-summary", getSalesSummaryForAdmin);

AdminRouter.patch("/categories/:id", updateCategory);
AdminRouter.get("/categories", getAllCategories);
AdminRouter.post("/categories", createCategory);
AdminRouter.delete("/categories/:id", deleteCategory);

module.exports = AdminRouter;
