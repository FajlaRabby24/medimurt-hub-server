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
const verifyAdmin = require("../middleware/verifyAdmin");
const AdminRouter = express.Router();

AdminRouter.get(
  "/advertisements",
  verifyFBToken,
  verifyAdmin,
  getAllAdvetisements
);
AdminRouter.patch(
  "/advertisements/:id",
  verifyFBToken,
  verifyAdmin,
  updateAdStatus
);

AdminRouter.patch(
  "/update-user-role/:id",
  verifyFBToken,
  verifyAdmin,
  updateUserRole
);
AdminRouter.get("/manage-users", verifyFBToken, verifyAdmin, getAllUser);

AdminRouter.get(
  "/cart/all-payments",
  verifyFBToken,
  verifyAdmin,
  getAllPendingPayments
);
AdminRouter.patch(
  "/cart/accept-payment",
  verifyFBToken,
  verifyAdmin,
  acceptPayment
);

AdminRouter.get("/sales", verifyFBToken, verifyAdmin, getSalesData);
AdminRouter.get(
  "/sales-summary",
  verifyFBToken,
  verifyAdmin,
  getSalesSummaryForAdmin
);

AdminRouter.patch(
  "/categories/:id",
  verifyFBToken,
  verifyAdmin,
  updateCategory
);
AdminRouter.get("/categories", verifyFBToken, verifyAdmin, getAllCategories);
AdminRouter.post("/categories", verifyFBToken, verifyAdmin, createCategory);
AdminRouter.delete(
  "/categories/:id",
  verifyFBToken,
  verifyAdmin,
  deleteCategory
);

module.exports = AdminRouter;
