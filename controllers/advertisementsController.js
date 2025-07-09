const { ObjectId } = require("mongodb");

// 🔹 GET /api/advertisements/mine
const getSellerAdvertisements = async (req, res) => {
  try {
    const email = req.query.email;
    const advertise = await req.db.advertisementsCollection
      .find({
        created_by: email,
      })
      .toArray();
    // res.status(200).json(advertise);
    res.send(advertise);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ads", error: err.message });
  }
};

// Get all advertisements (Admin access)
const getAllAdvetisements = async (req, res) => {
  try {
    const result = await req.db.advertisementsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to fetch advertisements:", error);
    res.status(500).json({ error: "Failed to fetch advertisements" });
  }
};

// 🔹 POST /api/advertisements
const addAdvertisement = async (req, res) => {
  try {
    const newAd = req.body;

    if (!newAd) {
      return res.status(400).json({ message: "Add information are required" });
    }

    const newAdvertise = {
      ...newAd,
      created_at: new Date().toISOString(),
    };

    const result = await req.db.advertisementsCollection.insertOne(
      newAdvertise
    );
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Error adding ad", error: err.message });
  }
};

// DELETE: Advertisement
const deleteAdvertisement = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.db.advertisementsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to delete advertisement", error: err });
  }
};

// Update advertisement status (accepted/rejected)
const updateAdStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await req.db.advertisementsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Failed to update advertisement status", error: err });
  }
};

module.exports = {
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
  getAllAdvetisements,
  updateAdStatus,
};
