const express = require("express");
const { createUser, loginUser } = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/createUser", createUser);
UserRouter.patch("/loginUser", loginUser);

module.exports = UserRouter;
