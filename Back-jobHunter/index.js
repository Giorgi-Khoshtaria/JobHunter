import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./Routes/auth.route.js";
import userRouter from "./Routes/user.route.js";

const app = express();
dotenv.config();

const PORT = 5000;
const mongoUrl = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // for JSON bodies
app.use(express.urlencoded({ limit: "10mb", extended: true })); // for form data

// Serve frontend uploads folder

// Routes
app.use("/api", authRouter);
app.use("/user", userRouter);

// MongoDB connection
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.error(error));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
