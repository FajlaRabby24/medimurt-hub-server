const express = require("express");
const {
  createOrUpdateUser,
  getUserRollByEmail,
  getAllUser,
  updateUserRole,
  getUserPaymentHistory,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/", createOrUpdateUser);
UserRouter.get("/payment-history", getUserPaymentHistory);
UserRouter.get("/:email/role", getUserRollByEmail);
UserRouter.get("/", getAllUser);
UserRouter.patch("/:id/role", updateUserRole);

module.exports = UserRouter;
