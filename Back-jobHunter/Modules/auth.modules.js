import mongoose from "mongoose";
const authSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["CompanyUser", "admin"],
      default: "CompanyUser",
    },
    companyName: { type: String, required: true, unique: true },
    companyImage: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    website: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    companyType: {
      type: String,
      required: true,
      enum: [
        "IT",
        "Bank",
        "Finance",
        "Healthcare",
        "Education",
        "Retail",
        "Manufacturing",
        "Other",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", authSchema);

export default User;
