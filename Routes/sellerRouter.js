const exprerss = require("express");
const { getSellerPaymentHistory } = require("../controllers/sellerController");
const SellerRouter = exprerss.Router();

SellerRouter.get("/payment-history", getSellerPaymentHistory);

module.exports = SellerRouter;
