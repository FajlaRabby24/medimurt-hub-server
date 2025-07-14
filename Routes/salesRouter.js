const express = require("express");
const { getSalesData } = require("../controllers/salesController");
const SalesRouter = express.Router();

SalesRouter.get("/", getSalesData);

module.exports = SalesRouter;
