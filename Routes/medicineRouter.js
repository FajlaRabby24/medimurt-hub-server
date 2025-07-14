const express = require("express");
const {
  getAllMedicineByCategory,
  getDiscountedMedicines,
  getAllMedicines,
} = require("../controllers/medicineController");
const MedicineRouter = express.Router();

MedicineRouter.get("/", getAllMedicines);
MedicineRouter.get("/discounted", getDiscountedMedicines);
MedicineRouter.get("/category/:category", getAllMedicineByCategory);

module.exports = MedicineRouter;
