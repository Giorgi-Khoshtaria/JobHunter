import mongoose from "mongoose";

const vacancyApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    coverLetter: { type: String, required: true },
    cv: { type: String, required: true },
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    vacancyTitle: { type: String },
  },
  { timestamps: true }
);

const VacancyApplication = mongoose.model(
  "VacancyApplication",
  vacancyApplicationSchema
);
export default VacancyApplication;
