const { ObjectId } = require("mongodb");

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

module.exports = {
  addToCart,
};
