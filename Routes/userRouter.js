const express = require("express");
const {
  createOrUpdateUser,
  getUserRollByEmail,
  getAllUser,
  updateUserRole,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/", createOrUpdateUser);
UserRouter.get("/:email/role", getUserRollByEmail);
UserRouter.get("/", getAllUser);
UserRouter.patch("/:id/role", updateUserRole);

module.exports = UserRouter;
