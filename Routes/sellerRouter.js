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
const { verifyFBToken } = require("../middleware/verifyFBToken");
const SellerRouter = exprerss.Router();

SellerRouter.get("/payment-history", verifyFBToken, getSellerPaymentHistory);

SellerRouter.get("/sales-summary", verifyFBToken, getSellerSalesSummary);

SellerRouter.get("/medicines/mine", verifyFBToken, getMineMedicine);
SellerRouter.post("/add-medicines", verifyFBToken, addMedicine);
SellerRouter.delete("/delete-medicines/:id", verifyFBToken, deleteMedicine);

SellerRouter.get(
  "/advertisements/mine",
  verifyFBToken,
  getSellerAdvertisements
);
SellerRouter.post("/add-advertisements", verifyFBToken, addAdvertisement);
SellerRouter.delete(
  "/delete-advertisements/:id",
  verifyFBToken,
  deleteAdvertisement
);

module.exports = SellerRouter;
