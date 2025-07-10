const { ObjectId } = require("mongodb");

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await req.db.medicinesCategoryCollection
      .find()
      .toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

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

// PATCH update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      category_name: req.body.category_name,
      category_image: req.body.category_image,
      last_update: new Date().toISOString(),
    };
    const result = await req.db.medicinesCategoryCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
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
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
};
