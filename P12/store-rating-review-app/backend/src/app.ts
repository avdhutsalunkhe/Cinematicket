import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // If you see a TypeScript error, run: npm i --save-dev @types/cors

import authRoutes from "./routes/auth";
import storeRoutes from "./routes/store";
import adminRoutes from "./routes/admin";
import ownerRoutes from "./routes/owner";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // ✅ Allow frontend to access API
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
