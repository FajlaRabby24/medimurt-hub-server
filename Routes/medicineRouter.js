const express = require("express");
const {
  addMedicine,
  deleteMedicine,
  getAllMedicineByCategory,
  getDiscountedMedicines,
  getMineMedicine,
  getAllMedicines,
} = require("../controllers/medicineController");
const MedicineRouter = express.Router();

MedicineRouter.get("/", getAllMedicines);
MedicineRouter.get("/mine", getMineMedicine);
MedicineRouter.get("/discounted", getDiscountedMedicines);
MedicineRouter.get("/category/:category", getAllMedicineByCategory);
MedicineRouter.post("/", addMedicine);
MedicineRouter.delete("/:id", deleteMedicine);

module.exports = MedicineRouter;
