import express from "express";
import { generateNutritionPlan } from "../controllers/nutritionController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/plan", verifyToken, generateNutritionPlan);

export default router;