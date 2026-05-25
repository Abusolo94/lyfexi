// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import agentRoutes from "./routes/agentRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";
import beautyRoutes from "./routes/beautyRoute.js"

dotenv.config();

const app = express();

app.use(cors({
  origin:[ "http://localhost:5173", "http://localhost:5000", "https://lyfexi.web.app"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LyfeXi AI backend is running");
});

app.use("/api/agent", agentRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/animal", animalRoutes);
app.use("/api/medication", medicationRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/fitness", fitnessRoutes);
app.use("/api/beauty", beautyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LyfeXi AI backend running on port ${PORT}`);
});