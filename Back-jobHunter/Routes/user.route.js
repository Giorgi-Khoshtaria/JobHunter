import express from "express";
import {
  getUserProfile,
  editProfile,
  upload,
} from "../Controllers/user.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const userRouter = express.Router();

userRouter.get("/profile/:userId", verifyToken, getUserProfile);
userRouter.put(
  "/profile/edit/:userId",
  verifyToken,
  upload.single("companyImage"),
  editProfile
);

export default userRouter;
