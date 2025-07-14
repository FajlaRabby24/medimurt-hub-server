const { ObjectId } = require("mongodb");

// GET: Get active advertisements
const getActiveAd = async (req, res) => {
  try {
    const result = await req.db.advertisementsCollection
      .find({ status: "active" })
      .toArray();
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch active advertisements" });
  }
};

module.exports = {
  getActiveAd,
};
