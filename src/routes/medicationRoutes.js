import express from "express";
import { saveMedicationReminder } from "../controllers/medicationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/reminder", verifyToken, saveMedicationReminder);

export default router;