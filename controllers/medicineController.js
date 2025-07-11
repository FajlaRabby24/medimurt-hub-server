const { ObjectId } = require("mongodb");

// Get all medicines of the logged-in seller
const getMedicine = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await req.db.medicinesCollection
      .find({ created_by: email })
      .toArray();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch medicines." });
  }
};

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

// Add a new medicine
const addMedicine = async (req, res) => {
  try {
    const medicine = req.body;
    const result = await req.db.medicinesCollection.insertOne({
      ...medicine,
      created_at: new Date().toISOString(),
    });
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to add medicine." });
  }
};

// Delete a medicine by ID
const deleteMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.db.medicinesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to delete medicine." });
  }
};
module.exports = {
  getMedicine,
  addMedicine,
  deleteMedicine,
  getAllMedicineByCategory,
};
