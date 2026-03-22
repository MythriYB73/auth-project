import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});