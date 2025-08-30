import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  applyForVacancy,
  delateVacancy,
  getAllVacancies,
  getVacanciesByCompanyId,
  getVacancyById,
  postVacancy,
  updateVacancy,
} from "../Controllers/vacancy.controllers.js";
import { cvUpload } from "../Controllers/vacancy.controllers.js";
const vacancyRouter = express.Router();

vacancyRouter.post("/vacancy", verifyToken, postVacancy);
vacancyRouter.get("/allVacancies", verifyToken, getAllVacancies);
vacancyRouter.get("/vacancyById/:id", getVacancyById);
vacancyRouter.post(
  "/applyforVacancy/:vacancyId",
  cvUpload.single("cv"),
  applyForVacancy
);
vacancyRouter.get("/myVacancies/:companyId", getVacanciesByCompanyId);
vacancyRouter.put("/updateVacancy/:id", verifyToken, updateVacancy);
vacancyRouter.delete("/deleteVacancy/:id", verifyToken, delateVacancy);
export default vacancyRouter;
