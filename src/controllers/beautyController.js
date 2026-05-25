// src/controllers/beautyController.js
import { openai } from "../config/openai.js";

export const generateBeautyAdvice = async (req, res) => {
  try {
    const {
      styleType,
      faceShape,
      skinToneOrHairType,
      occasion,
      preference,
    } = req.body;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are LyfeXi AI Beauty & Lifestyle Assistant.
You help with makeup guidance, haircut ideas, grooming, face shape matching, outfit color matching, and confidence.

Rules:
- Respect culture, skin tone, personal preference, and comfort.
- Do not shame appearance.
- For skin irritation, allergies, burns, infections, or severe acne, advise seeing a qualified skin specialist.
- Keep advice simple, practical, stylish, and safe.
`,
        },
        {
          role: "user",
          content: `
Create beauty/style advice.

Style Type: ${styleType}
Face Shape: ${faceShape}
Skin Tone or Hair Type: ${skinToneOrHairType}
Occasion: ${occasion}
Personal Preference: ${preference}
`,
        },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    res.status(200).json({
      advice: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Failed to generate beauty advice",
    });
  }
};