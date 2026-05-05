import { GoogleGenAI } from "@google/genai";
console.log(process.version);
const ai = new GoogleGenAI({ apiKey: "FAKE_API_KEY" });
console.log("ai config:", ai);
