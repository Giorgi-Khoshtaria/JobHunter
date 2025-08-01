import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { signUp } from "./Controllers/auth.controllers.js";

const app = express();
dotenv.config();
const backUrl = process.env.BACK_URL;
const PORT = 5000;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT} `);
});

app.use("/api", signUp);
