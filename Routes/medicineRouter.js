const express = require("express");
const {
  getMedicine,
  addMedicine,
  deleteMedicine,
  getAllMedicineByCategory,
} = require("../controllers/medicineController");
const MedicineRouter = express.Router();

MedicineRouter.get("/mine", getMedicine);
MedicineRouter.get("/category/:category", getAllMedicineByCategory);
MedicineRouter.post("/", addMedicine);
MedicineRouter.delete("/:id", deleteMedicine);

module.exports = MedicineRouter;
