import express from "express";
import { saveHumanProfile } from "../controllers/healthController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/profile", verifyToken, saveHumanProfile);

export default router;