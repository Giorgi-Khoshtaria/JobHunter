import { application } from "express";
import mongoose from "mongoose";
const vacancySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    location: { type: String, required: true },
    employmentType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Other"],
    },
    jobCategory: {
      type: String,
      required: true,
      enum: [
        "IT & Software",
        "Security",
        "Food & Hospitality",
        "PR & Marketing",
        "Healthcare",
        "Education",
        "Finance",
        "Sales",
        "Customer Service",
        "Construction",
        "Manufacturing",
        "Transportation",
        "Retail",
        "Design & Creative",
        "Engineering",
        "Human Resources",
        "Legal",
        "Other",
      ],
    },
    salary: { type: Number, required: true },
    requirements: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    companyName: { type: String, required: true },
    companyLogo: { type: String, default: "Not Provided" },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Vacancy = mongoose.model("Vacancy", vacancySchema);
export default Vacancy;
