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
const verifySeller = require("../middleware/verifySeller");
const SellerRouter = exprerss.Router();

SellerRouter.get(
  "/payment-history",
  verifyFBToken,
  verifySeller,
  getSellerPaymentHistory
);

SellerRouter.get(
  "/sales-summary",
  verifyFBToken,
  verifySeller,
  getSellerSalesSummary
);

SellerRouter.get(
  "/medicines/mine",
  verifyFBToken,
  verifySeller,
  getMineMedicine
);
SellerRouter.post("/add-medicines", verifyFBToken, verifySeller, addMedicine);
SellerRouter.delete(
  "/delete-medicines/:id",
  verifyFBToken,
  verifySeller,
  deleteMedicine
);

SellerRouter.get(
  "/advertisements/mine",
  verifyFBToken,
  verifySeller,
  getSellerAdvertisements
);
SellerRouter.post(
  "/add-advertisements",
  verifyFBToken,
  verifySeller,
  addAdvertisement
);
SellerRouter.delete(
  "/delete-advertisements/:id",
  verifyFBToken,
  verifySeller,
  deleteAdvertisement
);

module.exports = SellerRouter;
