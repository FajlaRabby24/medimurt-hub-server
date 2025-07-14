const exprerss = require("express");
const {
  getSellerPaymentHistory,
  getSellerSalesSummary,
} = require("../controllers/sellerController");
const SellerRouter = exprerss.Router();

SellerRouter.get("/payment-history", getSellerPaymentHistory);
SellerRouter.get("/sales-summary", getSellerSalesSummary);

module.exports = SellerRouter;
