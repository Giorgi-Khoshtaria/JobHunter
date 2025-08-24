import Vacancy from "../Modules/vacancy.modules.js";
import VacancyApplication from "../Modules/vacancyApply.modules.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
export const postVacancy = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      employmentType,
      jobCategory,
      salary,
      requirements,
      applicationDeadline,
      companyId,
      companyName,
      companyLogo,
    } = req.body;

    const deadline =
      applicationDeadline && applicationDeadline.trim() !== ""
        ? new Date(applicationDeadline)
        : undefined;

    // Validate the date if provided
    if (deadline && isNaN(deadline.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid application deadline date" });
    }

    const newVacancy = new Vacancy({
      title,
      description,
      companyId,
      location,
      employmentType,
      jobCategory,
      salary,
      requirements,
      applicationDeadline: deadline,
      companyName,
      companyLogo,
    });

    await newVacancy.save();
    res
      .status(201)
      .json({ message: "Vacancy created successfully", newVacancy });
  } catch (error) {
    console.error("Error creating vacancy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    if (!vacancies || vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }
    res.status(200).json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await Vacancy.findById(id);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error fetching vacancy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(
  __dirname,
  "../../Front-jobHunter/public/uploads/cvs"
);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  }
  cb(null, true);
};

export const cvUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

export const applyForVacancy = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, coverLetter, vacancyTitle } =
      req.body;
    const { vacancyId } = req.params;

    // Validation for required fields
    if (!firstName || !lastName || !email || !phone || !coverLetter) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if CV is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "CV file is required." });
    }

    // Create a new application
    const newApplication = new VacancyApplication({
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      cv: req.file.path,
      vacancyId,
      vacancyTitle,
    });

    await newApplication.save();

    return res.status(201).json({
      message: "Application submitted successfully!",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error applying for vacancy:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
