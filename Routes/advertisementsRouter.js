const express = require("express");
const {
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
  getActiveAd,
} = require("../controllers/advertisementsController");
const AdvertiseRouter = express.Router();

AdvertiseRouter.get("/mine", getSellerAdvertisements);
AdvertiseRouter.get("/active", getActiveAd);
AdvertiseRouter.post("/", addAdvertisement);
AdvertiseRouter.delete("/:id", deleteAdvertisement);
// AdvertiseRouter.patch("/:id", updateAdStatus);

module.exports = AdvertiseRouter;
