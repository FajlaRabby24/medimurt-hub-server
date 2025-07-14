const express = require("express");
const {
  createOrUpdateUser,
  getUserRollByEmail,
  getUserPaymentHistory,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/", createOrUpdateUser);
UserRouter.get("/payment-history", getUserPaymentHistory);
UserRouter.get("/:email/role", getUserRollByEmail);

module.exports = UserRouter;
