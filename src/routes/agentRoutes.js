// src/routes/agentRoutes.js
import express from "express";
import { chatWithAgent } from "../controllers/agentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/chat", verifyToken, chatWithAgent);

export default router;