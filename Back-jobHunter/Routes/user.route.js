import express from "express";
import { getUserProfile } from "../Controllers//user.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";
const userRouter = express.Router();

userRouter.get("/profile/:userId", verifyToken, getUserProfile);
export default userRouter;
