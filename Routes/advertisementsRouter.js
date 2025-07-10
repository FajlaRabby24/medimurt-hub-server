const express = require("express");
const {
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
  getAllAdvetisements,
  updateAdStatus,
  getActiveAd,
} = require("../controllers/advertisementsController");
const AdvertiseRouter = express.Router();

AdvertiseRouter.get("/mine", getSellerAdvertisements);
AdvertiseRouter.get("/", getAllAdvetisements);
AdvertiseRouter.get("/active", getActiveAd);
AdvertiseRouter.post("/", addAdvertisement);
AdvertiseRouter.delete("/:id", deleteAdvertisement);
AdvertiseRouter.patch("/:id", updateAdStatus);

module.exports = AdvertiseRouter;
