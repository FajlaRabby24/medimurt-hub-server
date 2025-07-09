const express = require("express");
const {
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
} = require("../controllers/advertisementsController");
const AdvertiseRouter = express.Router();

AdvertiseRouter.get("/mine", getSellerAdvertisements);
AdvertiseRouter.post("/", addAdvertisement);
AdvertiseRouter.delete("/:id", deleteAdvertisement);

module.exports = AdvertiseRouter;
