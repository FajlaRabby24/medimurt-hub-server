// create order
const createOrder = async (req, res) => {
  try {
    const { user_email, medicines, total_amount, transaction_id } = req.body;

    // Validation
    if (
      !user_email ||
      !medicines ||
      medicines.length === 0 ||
      !total_amount ||
      !transaction_id
    ) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Create order object
    const orderData = {
      ...req.body,
      ordered_at: new Date().toISOString(),
    };

    // Insert into database
    const result = await req.db.ordersCollection.insertOne(orderData);

    res.status(201).json({
      message: "Order placed successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createOrder,
};
