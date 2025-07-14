const { ObjectId } = require("mongodb");

// Create new user
const createOrUpdateUser = async (req, res) => {
  try {
    const newUser = req.body;
    const email = newUser.email;

    // Basic validation
    if (!newUser) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await req.db.usersCollection.findOne({
      email,
    });
    if (existingUser) {
      const updateDoc = {
        $set: {
          last_logged_in: new Date().toISOString(),
        },
      };
      // Update last_login field
      const result = await req.db.usersCollection.updateOne(
        { email: newUser.email },
        updateDoc
      );
      return res.status(200).json({
        message: "Login successful",
        ...result,
      });
    }

    // Create and save the user
    const result = await req.db.usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully", ...result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET: Get user role by email
const getUserRollByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    const user = await req.db.usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ role: user.role || "user" });
  } catch (error) {
    console.error("Error getting user role:", error);
    res.status(500).send({ message: "Failed to get role" });
  }
};

// GET /api/user/payment-history?user=email@example.com
const getUserPaymentHistory = async (req, res) => {
  const { user } = req.query;
  const result = await req.db.cartCollection
    .find({ user_email: user })
    .sort({ created_at: -1 }) // most recent first
    .toArray();
  res.send(result);
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

module.exports = {
  createOrUpdateUser,
  getUserRollByEmail,
  getUserPaymentHistory,
  getAllCategories,
};
