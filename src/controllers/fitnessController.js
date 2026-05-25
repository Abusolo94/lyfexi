import { openai } from "../config/openai.js";

export const generateFitnessPlan = async (req, res) => {
  try {
    const { goal, level, weight, availableTime, healthLimits } = req.body;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are LyfeXi AI Fitness Coach. Give safe general fitness guidance. Do not replace doctors or physiotherapists.",
        },
        {
          role: "user",
          content: `
Create a fitness plan.

Goal: ${goal}
Fitness level: ${level}
Weight: ${weight}
Available time: ${availableTime}
Injuries or health limits: ${healthLimits}
`,
        },
      ],
      temperature: 0.5,
      max_tokens: 900,
    });

    res.status(200).json({
      plan: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to generate fitness plan",
    });
  }
};