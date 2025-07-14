// get sales data
const getSalesData = async (req, res) => {
  try {
    const result = await req.db.cartCollection
      .find({ payment_status: "paid" })
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Faild to fetching  sales data", error });
  }
};

module.exports = {
  getSalesData,
};
