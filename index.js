const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const errorHandler = require("./middleware/ErrorHandler");
const UserRouter = require("./Routes/userRouter");
const AdvertiseRouter = require("./Routes/advertisementsRouter");
dotenv.config();

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
    const usersCollection = db.collection("users");
    const advertisementsCollection = db.collection("advertisements");

    // Attach db instance to request
    app.use((req, res, next) => {
      req.db = {
        usersCollection,
        advertisementsCollection,
      };
      next();
    });

    // all routes
    app.use("/api/users", UserRouter);
    app.use("/api/advertisements", AdvertiseRouter);

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
