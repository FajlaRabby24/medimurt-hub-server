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

// GET /api/seller/sales-summary?email=seller@gmail.com
const getSellerSalesSummary = async (req, res) => {
  const sellerEmail = req.query.email;
  try {
    const result = await req.db.cartCollection
      .aggregate([
        { $match: { seller_email: sellerEmail } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total_price" },
            totalPaid: {
              $sum: {
                $cond: [
                  { $eq: ["$payment_status", "paid"] },
                  "$total_price",
                  0,
                ],
              },
            },
            totalPending: {
              $sum: {
                $cond: [
                  { $eq: ["$payment_status", "pending"] },
                  "$total_price",
                  0,
                ],
              },
            },
          },
        },
      ])
      .toArray();

    res.send(result[0] || { totalRevenue: 0, totalPaid: 0, totalPending: 0 });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summary", error });
  }
};

module.exports = {
  getSellerPaymentHistory,
  getSellerSalesSummary,
};
