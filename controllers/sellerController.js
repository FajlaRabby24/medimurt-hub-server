// Node.js with MongoDB (no mongoose)
const getSellerPaymentHistory = async (req, res) => {
  const seller = req.query.seller;
  try {
    const result = await req.db.cartCollection
      .find({ seller_email: seller })
      .sort({ created_at: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller payments", error });
  }
};

module.exports = {
  getSellerPaymentHistory,
};
