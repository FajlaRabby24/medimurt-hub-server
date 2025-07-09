const express = require("express");
const {
  getMedicine,
  addMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");
const MedicineRouter = express.Router();

MedicineRouter.get("/mine", getMedicine);
MedicineRouter.post("/", addMedicine);
MedicineRouter.delete("/:id", deleteMedicine);

module.exports = MedicineRouter;
