const { ObjectId } = require("mongodb");

// GET: Get active advertisements
const getActiveAd = async (req, res) => {
  try {
    const result = await req.db.advertisementsCollection
      .find({ status: "active" })
      .toArray();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch active advertisements" });
  }
};

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
        { email },
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
    const email = req.query.email;
    console.log({ email });
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
  try {
    const { email } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = { user_email: email };

    const [totalCount, payments] = await Promise.all([
      req.db.cartCollection.countDocuments(query),
      req.db.cartCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ created_at: -1 })
        .toArray(),
    ]);

    res.status(200).json({
      data: payments,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });

    // const { email } = req.query;
    // const result = await req.db.cartCollection
    //   .find({ user_email: email })
    //   .sort({ created_at: -1 }) // most recent first
    //   .toArray();
    // res.send(result);
  } catch (error) {
    console.error("Error getting user role:", error);
    res.status(500).send({ message: "Failed to get role" });
  }

  const { email } = req.query;
  const result = await req.db.cartCollection
    .find({ user_email: email })
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

// GET: Paginated Medicines
const getAllMedicines = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    console.log(searchQuery);

    const filter = {
      $or: [
        { medicine_name: { $regex: searchQuery, $options: "i" } },
        { generic_name: { $regex: searchQuery, $options: "i" } },
        { company: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const [totalCount, medicines] = await Promise.all([
      req.db.medicinesCollection.countDocuments(),
      req.db.medicinesCollection.find(filter).skip(skip).limit(limit).toArray(),
    ]);

    res.status(200).json({
      data: medicines,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error });
  }
};

// Get all medicine by category
const getAllMedicineByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const query = { category };

    const [totalCount, medicines] = await Promise.all([
      req.db.medicinesCollection.countDocuments(query),
      req.db.medicinesCollection.find(query).skip(skip).limit(limit).toArray(),
    ]);

    res.status(200).json({
      data: medicines,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines." });
  }
};

// POST /api/cart
const addToCart = async (req, res) => {
  try {
    const email = req.body.user_email;
    const medicineId = req.body.medicine_id;

    if (!email || !medicineId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cartItem = {
      ...req.body,
      created_at: new Date().toISOString(),
    };
    const result = await req.db.cartCollection.insertOne(cartItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

// update after payment
const updateCartAfterPayment = async (req, res) => {
  try {
    const { email, transactionId } = req.body;
    console.log(req.body);
    if (!email && !transactionId)
      return res.status(400).json({ message: "Missing required data" });

    const result = await req.db.cartCollection.updateMany(
      { user_email: email, payment_status: { $ne: "paid" } },
      {
        $set: {
          transaction_id: transactionId,
          paid_at: new Date().toISOString(),
        },
      }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error });
  }
};

// PATCH /api/cart/:id
const updateQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    const { total_price } = req.body;

    const result = await req.db.cartCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity, total_price } }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quantity", error });
  }
};

// DELETE /api/users/cart/:id
const removeCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.db.cartCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
};

// DELETE /api/cart/clear?email=user@example.com
const clearCart = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const result = await req.db.cartCollection.deleteMany({
      user_email: email,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};

// GET /api/cart?email=user@example.com
const getUserCart = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const cartItems = await req.db.cartCollection
      .find({ user_email: email, payment_status: { $ne: "paid" } })
      .toArray();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const email = req.query.email;
    const { name, imageUrl } = req.body;
    console.log(req.body);
    const updatedDoc = {
      $set: {
        name,
        image: imageUrl,
      },
    };
    const result = await req.db.usersCollection.updateOne(
      { email },
      updatedDoc
    );
    res
      .status(200)
      .send({ message: "Profile updated successfully!", ...result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

module.exports = {
  createOrUpdateUser,
  getUserRollByEmail,
  getUserPaymentHistory,
  getAllCategories,
  getActiveAd,
  getDiscountedMedicines,
  getAllMedicines,
  addToCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  getUserCart,
  updateCartAfterPayment,
  getAllMedicineByCategory,
  updateUserProfile,
};
