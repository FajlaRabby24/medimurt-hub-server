const express = require("express");
const { getActiveAd } = require("../controllers/advertisementsController");
const AdvertiseRouter = express.Router();

AdvertiseRouter.get("/active", getActiveAd);

module.exports = AdvertiseRouter;
