import { openai } from "../config/openai.js";

export const generateNutritionPlan = async (req, res) => {
  try {
    const { planType, goal, ageStage, weight, limits } = req.body;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are LyfeXi AI Nutrition Planner. Give safe general nutrition guidance only. Do not replace doctors, dietitians, or veterinarians.",
        },
        {
          role: "user",
          content: `
Create a nutrition plan.

Plan type: ${planType}
Goal: ${goal}
Age or stage: ${ageStage}
Weight: ${weight}
Allergies, conditions, or limits: ${limits}
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
      message: error.message || "Failed to generate nutrition plan",
    });
  }
};