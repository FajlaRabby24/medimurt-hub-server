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
      .find({ user_email: email, payment_status: { $ne: "paid" } })
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

// GET /api/cart/all-payments
const getAllPayments = async (req, res) => {
  try {
    const result = await req.db.cartCollection
      .aggregate([
        {
          $group: {
            _id: "$user_email",
            user_email: { $first: "$user_email" },
            transaction_id: { $first: "$transaction_id" },
            payment_status: { $first: "$payment_status" },
            total_price: { $sum: "$total_price" },
          },
        },
        { $sort: { payment_status: 1 } }, // Show pending first
      ])
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment data", error });
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

module.exports = {
  addToCart,
  updateQuantity,
  getUserCart,
  clearCart,
  removeCartItem,
  getAllPayments,
  acceptPayment,
  updateCartAfterPayment,
};
