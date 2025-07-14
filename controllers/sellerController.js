const { ObjectId } = require("mongodb");

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

// Get all medicines of the logged-in seller
const getMineMedicine = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await req.db.medicinesCollection
      .find({ created_by: email })
      .toArray();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch medicines." });
  }
};

// Add a new medicine
const addMedicine = async (req, res) => {
  try {
    const medicine = req.body;
    const result = await req.db.medicinesCollection.insertOne({
      ...medicine,
      created_at: new Date().toISOString(),
    });
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to add medicine." });
  }
};

// Delete a medicine by ID
const deleteMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.db.medicinesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to delete medicine." });
  }
};

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

// 🔹 POST /api/advertisements
const addAdvertisement = async (req, res) => {
  try {
    const newAd = req.body;

    if (!newAd) {
      return res.status(400).json({ message: "Ads information are required" });
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

module.exports = {
  getSellerPaymentHistory,
  getSellerSalesSummary,
  getMineMedicine,
  addMedicine,
  deleteMedicine,
  getSellerAdvertisements,
  addAdvertisement,
  deleteAdvertisement,
};
