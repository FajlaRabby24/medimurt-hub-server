// GET /api/admin/sales-summary
const getSalesSummaryForAdmin = async (req, res) => {
  try {
    const summary = await req.db.cartCollection
      .aggregate([
        {
          $group: {
            _id: "$payment_status",
            total: { $sum: "$total_price" },
          },
        },
      ])
      .toArray();

    const paid = summary.find((s) => s._id === "paid")?.total || 0;
    const pending = summary.find((s) => s._id === "pending")?.total || 0;

    res.send({
      totalRevenue: paid + pending,
      totalPaid: paid,
      totalPending: pending,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch sales summary", error: err });
  }
};

module.exports = {
  getSalesSummaryForAdmin,
};
