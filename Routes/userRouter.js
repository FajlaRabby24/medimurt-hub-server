const express = require("express");
const { createUser } = require("../controllers/userControllers");
const UserRouter = express.Router();

UserRouter.post("/", createUser);

module.exports = UserRouter;
