import express from "express";
const authRouter = express.Router();

import { login, signUp } from "../Controllers/auth.controllers.js";

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);

export default authRouter;
