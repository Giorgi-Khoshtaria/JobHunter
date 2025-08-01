import express from "express";
const router = express.Router();

import { signUp } from "../Controllers/auth.controllers.js";

router.post("/signUp", signUp);

export default router;
