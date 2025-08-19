import User from "../Modules/auth.modules.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../../Front-jobHunter/public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, "companyImage-" + uniqueSuffix + extension);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// GET User Profile
export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userProfile = await User.findById(userId).select("-password");
    if (!userProfile)
      return res.status(404).json({ message: "User not found" });

    if (userProfile.companyImage) {
      userProfile.companyImage = `/public/uploads/${userProfile.companyImage}`;
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// EDIT User Profile
export const editProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.companyImage = req.file.filename;

      // Remove old image if exists
      const oldUser = await User.findById(userId);
      if (oldUser && oldUser.companyImage) {
        const oldImagePath = path.join(uploadsDir, oldUser.companyImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    if (updatedUser.companyImage) {
      updatedUser.companyImage = `/public/uploads/${updatedUser.companyImage}`;
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Serve uploaded files
export const serveUploadedFile = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
};
