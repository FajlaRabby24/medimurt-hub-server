const express = require("express");
const { createOrder } = require("../controllers/ordersController");
const OrdersRouter = express.Router();

OrdersRouter.post("/create", createOrder);

module.exports = OrdersRouter;
