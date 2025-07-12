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

// GET /api/cart?email=user@example.com
const getUserCart = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const cartItems = await req.db.cartCollection
      .find({ user_email: email })
      .toArray();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

// DELETE /api/cart/:id
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

module.exports = {
  addToCart,
  updateQuantity,
  getUserCart,
  clearCart,
  removeCartItem,
};
