import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  getAllVacancies,
  postVacancy,
} from "../Controllers/vacancy.controllers.js";
const vacancyRouter = express.Router();

vacancyRouter.post("/vacancy", verifyToken, postVacancy);
vacancyRouter.get("/allVacancies", verifyToken, getAllVacancies);
export default vacancyRouter;
