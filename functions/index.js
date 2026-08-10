const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin (We will add the credentials in Render later)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Basic Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Pune Pravas Backend is running on Render!" });
});

// Import your services here later (we will rewrite auth.service.js to standard Express next)
// app.use("/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});