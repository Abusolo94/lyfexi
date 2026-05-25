// // src/controllers/agentController.js
// import { openai } from "../config/openai.js";

// export const chatWithAgent = async (req, res) => {
//   try {
//     const { message, mode = "general", profile = {} } = req.body;

//     if (!message) {
//       return res.status(400).json({ message: "Message is required" });
//     }

//     const systemPrompt = `
// You are LyfeXi AI, a safe AI assistant for human health, animal care, nutrition, fitness, medication reminders, emergency guidance, makeup advice, grooming, and lifestyle.

// Rules:
// - Do not diagnose disease.
// - Do not prescribe medication.
// - Do not invent dangerous dosages.
// - For serious symptoms, advise urgent doctor or veterinarian care.
// - Ask follow-up questions when needed.
// - Keep answers simple, safe, and practical.
// - For medication, recommend following doctor, pharmacist, or vet instructions.
// - For beauty/makeup/haircut advice, respect skin sensitivity, allergies, culture, and user preference.
// `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "system",
//           content: systemPrompt,
//         },
//         {
//           role: "user",
//           content: `
// Mode: ${mode}

// User profile:
// ${JSON.stringify(profile, null, 2)}

// User question:
// ${message}
// `,
//         },
//       ],
//       temperature: 0.5,
//     });

//     const aiReply = response.choices[0].message.content;

//     return res.status(200).json({
//       reply: aiReply,
//     });
//   } catch (error) {
//    console.error("AI ERROR:", error);

//      return res.status(500).json({
//   message: error.message || "AI agent failed to respond",
//     });
//   }
// };


// src/controllers/agentController.js
import { openai } from "../config/openai.js";

export const chatWithAgent = async (req, res) => {
  try {
    const { message, mode = "general", profile = {} } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const systemPrompt = `
You are LyfeXi AI, a safe AI assistant for human health, animal care, nutrition, fitness, medication reminders, emergency guidance, makeup advice, grooming, and lifestyle.

Rules:
- Do not diagnose disease.
- Do not prescribe medication.
- Do not invent dangerous dosages.
- For serious symptoms, advise urgent doctor or veterinarian care.
- Ask follow-up questions when needed.
- Keep answers simple, safe, and practical.
- For medication, recommend following doctor, pharmacist, or vet instructions.
- For beauty/makeup/haircut advice, respect skin sensitivity, allergies, culture, and user preference.
`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `
Mode: ${mode}

User profile:
${JSON.stringify(profile, null, 2)}

User question:
${message}
`,
        },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    const aiReply =
      response?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({
      reply: aiReply,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(error.status || 500).json({
      message: error.message || "AI agent failed to respond",
    });
  }
};