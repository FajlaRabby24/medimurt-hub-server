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

// login user
const loginUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email are required" });
    }
    const updateDoc = {
      $set: {
        last_logged_in: new Date().toISOString(),
      },
    };
    // Update last_login field
    const result = await req.db.usersCollection.updateOne({ email }, updateDoc);
    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser, loginUser };
