const exprerss = require("express");
const {
  getSellerPaymentHistory,
  getSellerSalesSummary,
  getMineMedicine,
  addMedicine,
  deleteMedicine,
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
} = require("../controllers/sellerController");
const SellerRouter = exprerss.Router();

SellerRouter.get("/payment-history", getSellerPaymentHistory);
SellerRouter.get("/sales-summary", getSellerSalesSummary);
SellerRouter.get("/medicines/mine", getMineMedicine);
SellerRouter.post("/add-medicines", addMedicine);
SellerRouter.delete("/delete-medicines/:id", deleteMedicine);
SellerRouter.get("/advertisements/mine", getSellerAdvertisements);
SellerRouter.post("/add-advertisements", addAdvertisement);
SellerRouter.delete("/delete-advertisements/:id", deleteAdvertisement);

module.exports = SellerRouter;
