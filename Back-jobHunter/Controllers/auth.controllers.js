import bcrypt from "bcrypt";
import User from "../Modules/auth.modules.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.APP_TOKEN_URL;

export const signUp = async (req, res, next) => {
  const {
    companyName,
    country,
    city,
    email,
    password,
    website,
    description,
    companyType,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existName = await User.findOne({ companyName });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (existName) {
      return res.status(409).json({ message: "Company name already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      companyName,
      email,
      password: hashedPassword,
      website,
      description,
      companyType,
      country,
      city,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Company registered successfully",
      user: {
        id: newUser._id,
        companyName: newUser.companyName,
        email: newUser.email,
        companyType: newUser.companyType,
        description: newUser.description,
        country: newUser.country,
        city: newUser.city,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password, companyName } = req.body;

  try {
    const user = await User.findOne({ email, companyName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        companyName: user.companyName,
        email: user.email,
        companyType: user.companyType,
        description: user.description,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
