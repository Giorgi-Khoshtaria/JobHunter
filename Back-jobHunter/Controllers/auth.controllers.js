import bcrypt from "bcrypt";
import User from "../Modules/auth.modules.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.APP_TOKEN_URL;

export const signUp = async (req, res, next) => {
  const { companyName, email, password, website, description, companyType } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      companyName,
      email,
      password: hashedPassword,
      website,
      description,
      companyType,
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
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
