const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
dotenv.config();
const errorHandler = require("./middleware/ErrorHandler.js");
const UserRouter = require("./Routes/userRouter.js");
const SellerRouter = require("./Routes/sellerRouter.js");
const AdminRouter = require("./Routes/adminRouter.js");
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
// firebase
const admin = require("firebase-admin");
const decodedKey = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8"
);
const serviceAccount = JSON.parse(decodedKey);
const { verifyFBToken } = require("./middleware/verifyFBToken.js");
const verifyAdmin = require("./middleware/verifyAdmin.js");
const verifySeller = require("./middleware/verifySeller.js");
const verifyEmail = require("./middleware/verifyEmail.js");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use((req, res, next) => {
  req.admin = admin;
  next();
});

async function run() {
  try {
    // await client.connect();

    const db = client.db("medicineCenter");
    // collection
    const usersCollection = db.collection("users");
    const advertisementsCollection = db.collection("advertisements");
    const medicinesCollection = db.collection("medicines");
    const medicinesCategoryCollection = db.collection("medicinesCategory");
    const cartCollection = db.collection("cart");
    const ordersCollection = db.collection("orders");

    // Attach db instance to request
    app.use((req, res, next) => {
      req.db = {
        usersCollection,
        advertisementsCollection,
        medicinesCollection,
        medicinesCategoryCollection,
        cartCollection,
        ordersCollection,
      };
      next();
    });

    // all routes
    app.use("/api/users", UserRouter);
    app.use("/api/admin", verifyFBToken, verifyEmail, verifyAdmin, AdminRouter);
    app.use(
      "/api/seller",
      verifyFBToken,
      verifyEmail,
      verifySeller,
      SellerRouter
    );

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const grandTotalInCents = req.body.grandTotalInCents;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: grandTotalInCents,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log("🚀 Pinged your deployment.");
  } finally {
  }
}
run().catch(console.dir);

// Sample route
app.get("/", (req, res) => {
  res.send("Medicine server is running");
});

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
