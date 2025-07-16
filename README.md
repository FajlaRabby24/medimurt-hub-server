# 🛠️ Multi-Vendor Medicine E-commerce Backend - Server

This is the **Express + MongoDB** based backend server for the Medicine E-commerce platform. It supports full CRUD operations, authentication, payment processing with Stripe, and seller/admin/user role-based APIs.

## 🔗 Backend Live Link: [Visit Server API](https://multi-vendor-medicine-selling-websi.vercel.app)

---

## 🔥 Key Features (Server Side)

1. RESTful API structure for client consumption
2. Firebase Admin SDK for secure token verification
3. Stripe payment intent & webhook support
4. Middleware-based role checking for routes (admin, seller)
5. Advertisement management with MongoDB and toggle states
6. Category, medicine, payment, user & report APIs
7. Downloadable sales report in CSV/Excel format
8. Search, pagination & sort implemented via query params
9. Environment variables used for Stripe, MongoDB, Firebase credentials
10. Organized controller-service structure

---

## 📁 Folder Structure

```
📁 server/
├── controllers/
├── middlewares/
├── routes/
├── utils/
└── index.js
```

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

Make sure you create a `.env` file with the following:

```env
MONGODB_URI=your_mongo_uri
FIREBASE_PRIVATE_KEY=...
STRIPE_SECRET_KEY=...
```

---

> ✅ This server is deployed on Vercel as a serverless function.
