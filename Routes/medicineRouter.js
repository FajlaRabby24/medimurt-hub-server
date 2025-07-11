const express = require("express");
const {
  getMedicine,
  addMedicine,
  deleteMedicine,
  getAllMedicineByCategory,
  getDiscountedMedicines,
} = require("../controllers/medicineController");
const MedicineRouter = express.Router();

MedicineRouter.get("/mine", getMedicine);
MedicineRouter.get("/discounted", getDiscountedMedicines);
MedicineRouter.get("/category/:category", getAllMedicineByCategory);
MedicineRouter.post("/", addMedicine);
MedicineRouter.delete("/:id", deleteMedicine);

module.exports = MedicineRouter;
