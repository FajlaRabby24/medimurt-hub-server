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

// GET: Get  all user
const getAllUser = async (req, res) => {
  try {
    const users = await req.db.usersCollection.find().toArray();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
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

module.exports = {
  createOrUpdateUser,
  getUserRollByEmail,
  getAllUser,
  updateUserRole,
};
