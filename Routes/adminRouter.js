const express = require("express");
const { getSalesSummaryForAdmin } = require("../controllers/adminController");
const AdminRouter = express.Router();

AdminRouter.get("/sales-summary", getSalesSummaryForAdmin);

module.exports = AdminRouter;
