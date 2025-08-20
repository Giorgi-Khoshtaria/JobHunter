import express from "express";
import {
  getUserProfile,
  editProfile,
  upload,
  getCompanyImageByUserId,
} from "../Controllers/user.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";
import multer from "multer";

const userRouter = express.Router();

userRouter.get("/profile/:userId", verifyToken, getUserProfile);
userRouter.get("/companyImage/:userId", verifyToken, getCompanyImageByUserId);
userRouter.put(
  "/profile/edit/:userId",
  verifyToken,
  (req, res, next) => {
    upload.single("companyImage")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle file size limit
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "Image size cannot exceed 5MB" });
        }
        // Handle wrong file type
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res
            .status(400)
            .json({ message: "Only image files are allowed!" });
        }
        // Default multer error
        return res.status(400).json({ message: "File upload failed" });
      } else if (err) {
        return res.status(500).json({ message: "Something went wrong" });
      }
      next();
    });
  },
  editProfile
);

export default userRouter;
