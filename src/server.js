import dotenv from "dotenv";
dotenv.config(); // MUST be first
import express from "express";
import cors from "cors";
import { connectDB } from './config/database.js';
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.send("Server running"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server error" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));const PORT = process.env.PORT || 5000;
