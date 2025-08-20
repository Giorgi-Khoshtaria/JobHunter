import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import { postVacancy } from "../Controllers/vacancy.controllers.js";
const vacancyRouter = express.Router();

vacancyRouter.post("/vacancies", verifyToken, postVacancy);
export default vacancyRouter;
