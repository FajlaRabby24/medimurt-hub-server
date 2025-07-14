const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
dotenv.config();
const errorHandler = require("./middleware/ErrorHandler");
const UserRouter = require("./Routes/userRouter");
const AdvertiseRouter = require("./Routes/advertisementsRouter");
const MedicineRouter = require("./Routes/medicineRouter");
const CategoryRouter = require("./Routes/CategoryRouter");
const CartRouter = require("./Routes/cartRouter");
const OrdersRouter = require("./Routes/ordersRouter");
const SalesRouter = require("./Routes/salesRouter");
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);

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

async function run() {
  try {
    await client.connect();

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
    app.use("/api/advertisements", AdvertiseRouter);
    app.use("/api/medicines", MedicineRouter);
    app.use("/api/categories", CategoryRouter);
    app.use("/api/cart", CartRouter);
    app.use("/api/orders", OrdersRouter);
    app.use("/api/sales", SalesRouter);

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const grandTotalInCents = req.body.grandTotalInCents;
      console.log(grandTotalInCents);
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

    await client.db("admin").command({ ping: 1 });
    console.log("🚀 Pinged your deployment.");
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
