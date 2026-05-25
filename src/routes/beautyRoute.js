// src/routes/beautyRoutes.js
import express from "express";
import { generateBeautyAdvice } from "../controllers/beautyController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/advice", verifyToken, generateBeautyAdvice);

export default router;