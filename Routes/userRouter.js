const express = require("express");
const {
  createOrUpdateUser,
  getUserRollByEmail,
} = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/", createOrUpdateUser);
UserRouter.get("/:email/role", getUserRollByEmail);

module.exports = UserRouter;
