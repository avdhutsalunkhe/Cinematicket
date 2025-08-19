import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import storeRoutes from "./routes/store";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
