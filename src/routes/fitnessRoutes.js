import express from "express";
import { generateFitnessPlan } from "../controllers/fitnessController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/plan", verifyToken, generateFitnessPlan);

export default router;