import express from "express";
const authRouter = express.Router();

import {
  forgotPassword,
  login,
  signUp,
} from "../Controllers/auth.controllers.js";

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.put("/reset-password", forgotPassword);

export default authRouter;
