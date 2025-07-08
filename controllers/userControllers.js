// Create new user
const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Basic validation
    if (!newUser) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await req.db.usersCollection.findOne({
      email: newUser.email,
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save the user
    const result = await req.db.usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User created successfully", ...result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser };
