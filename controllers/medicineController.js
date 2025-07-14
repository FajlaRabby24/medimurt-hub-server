const { ObjectId } = require("mongodb");

// Get all medicine by category
const getAllMedicineByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const medicines = await req.db.medicinesCollection
      .find({ category })
      .toArray();

    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines." });
  }
};

// GET: Get discounted medicine
const getDiscountedMedicines = async (req, res) => {
  try {
    const discountedMedicines = await req.db.medicinesCollection
      .find({ discount: { $gt: 0 } })
      .toArray();

    res.status(200).json(discountedMedicines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch discount medicines", error });
  }
};

// GET: Get all medicines
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await req.db.medicinesCollection.find().toArray();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error });
  }
};

module.exports = {
  getAllMedicineByCategory,
  getDiscountedMedicines,
  getAllMedicines,
};
