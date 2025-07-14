const { ObjectId } = require("mongodb");

// GET /api/admin/sales-summary
const getSalesSummaryForAdmin = async (req, res) => {
  try {
    const summary = await req.db.cartCollection
      .aggregate([
        {
          $group: {
            _id: "$payment_status",
            total: { $sum: "$total_price" },
          },
        },
      ])
      .toArray();

    const paid = summary.find((s) => s._id === "paid")?.total || 0;
    const pending = summary.find((s) => s._id === "pending")?.total || 0;

    res.send({
      totalRevenue: paid + pending,
      totalPaid: paid,
      totalPending: pending,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch sales summary", error: err });
  }
};

// Get all advertisements (Admin access)
const getAllAdvetisements = async (req, res) => {
  try {
    const result = await req.db.advertisementsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to fetch advertisements:", error);
    res.status(500).json({ error: "Failed to fetch advertisements" });
  }
};

// GET: Get  all user || Admin
const getAllUser = async (req, res) => {
  try {
    const users = await req.db.usersCollection.find().toArray();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

// GET all categories || Admin
const getAllCategories = async (req, res) => {
  try {
    const categories = await req.db.medicinesCategoryCollection
      .aggregate([
        {
          $lookup: {
            from: "medicines", // join with medicines collection
            localField: "category_name", // category name in this collection
            foreignField: "category", // category field in medicines
            as: "medicines", // store matched medicines here
          },
        },
        {
          $addFields: {
            total_medicines: { $size: "$medicines" }, // count number of medicines
          },
        },
        {
          $project: {
            medicines: 0, // remove full medicines array from output
          },
        },
      ])
      .toArray();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories with medicine count",
      error: error.message,
    });
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

// GET /api/cart/all-payments
const getAllPendingPayments = async (req, res) => {
  try {
    const result = await req.db.cartCollection
      .aggregate([
        {
          $match: { payment_status: "pending" }, // ✅ only get pending
        },
        {
          $group: {
            _id: "$user_email",
            user_email: { $first: "$user_email" },
            transaction_id: { $first: "$transaction_id" },
            payment_status: { $first: "$payment_status" },
            total_price: { $sum: "$total_price" },
          },
        },
        { $sort: { payment_status: 1 } },
      ])
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment data", error });
  }
};

// get sales data || Admin
const getSalesData = async (req, res) => {
  try {
    const result = await req.db.cartCollection
      .find({ payment_status: "paid" })
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Faild to fetching  sales data", error });
  }
};

// Update advertisement status (accepted/rejected)
const updateAdStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await req.db.advertisementsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to update advertisement status", error: err });
  }
};

// PATCH: Patch update user role
const updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
    const result = await req.db.usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role } }
    );

    if (!result.modifiedCount) {
      return res
        .status(404)
        .json({ message: "User not found or already has this role" });
    }
    res.send({
      message: "User role updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Failed to update user role" });
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

// PATCH /api/cart/accept-payment/:email
const acceptPayment = async (req, res) => {
  try {
    const { email } = req.query;

    const result = await req.db.cartCollection.updateMany(
      { user_email: email, payment_status: { $ne: "paid" } },
      {
        $set: {
          payment_status: "paid",
          approved_at: new Date().toISOString(),
        },
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update payemnt status", error });
  }
};

module.exports = {
  getSalesSummaryForAdmin,
  getAllAdvetisements,
  getAllUser,
  getAllCategories,
  getAllPendingPayments,
  getSalesData,
  updateAdStatus,
  updateUserRole,
  updateCategory,
  acceptPayment,
  createCategory,
  deleteCategory,
};
