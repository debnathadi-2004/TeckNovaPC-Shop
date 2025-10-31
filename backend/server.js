import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 👇 Add this line
app.get("/", (req, res) => {
  res.send("✅ TechNova Backend is Running Successfully!");
});

// your MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// your API routes
// app.use("/api/users", userRoutes);  <-- keep your other routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
