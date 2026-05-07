import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({});
  const chat = ai.chats.create({ model: "gemini-3-flash-preview" });
  try {
    const result = await chat.sendMessageStream("Hello as string");
    for await (const chunk of result) console.log(chunk.text);
  } catch(e) { console.error("string error:", e.message); }

  try {
    const result2 = await chat.sendMessageStream({ message: "Hello as object" });
    for await (const chunk of result2) console.log(chunk.text);
  } catch(e) { console.error("object error:", e.message); }

  try {
    const result3 = await chat.sendMessageStream({ text: "Hello as text object" });
    for await (const chunk of result3) console.log(chunk.text);
  } catch(e) { console.error("text object error:", e.message); }
}
run();
