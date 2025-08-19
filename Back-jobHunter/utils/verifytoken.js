/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.APP_TOKEN_URL;

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token expired, handle it
      // Optionally send a response to indicate the token has expired
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Endpoint to refresh token
