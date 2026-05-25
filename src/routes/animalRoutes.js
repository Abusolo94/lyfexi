import express from "express";
import { saveAnimalProfile } from "../controllers/animalController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/profile", verifyToken, saveAnimalProfile);

export default router;