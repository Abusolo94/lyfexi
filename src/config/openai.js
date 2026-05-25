

// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();
// console.log(process.env.GROQ_API_KEY ? "KEY FOUND" : "NO KEY");
// export const openai = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });


import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log("ENV KEYS:", Object.keys(process.env).filter((k) => k.includes("GROQ")));
console.log("GROQ STATUS:", process.env.GROQ_API_KEY ? "FOUND" : "MISSING");

const groqKey = process.env.GROQ_API_KEY;

if (!groqKey) {
  throw new Error("GROQ_API_KEY is missing. Check Railway Variables.");
}

export const openai = new OpenAI({
  apiKey: groqKey,
  baseURL: "https://api.groq.com/openai/v1",
});