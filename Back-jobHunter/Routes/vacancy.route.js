import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  applyForVacancy,
  getAllVacancies,
  getVacancyById,
  postVacancy,
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
export default vacancyRouter;
