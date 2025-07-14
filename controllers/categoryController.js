const { ObjectId } = require("mongodb");

// POST a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = {
      ...req.body,
      created_at: new Date().toISOString(),
    };
    const result = await req.db.medicinesCategoryCollection.insertOne(
      newCategory
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// DELETE category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await req.db.medicinesCategoryCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};

module.exports = {
  deleteCategory,
  createCategory,
};
