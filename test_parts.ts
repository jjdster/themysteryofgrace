import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({});
  const chat = ai.chats.create({ model: "gemini-2.5-flash" });
  
  try {
    console.log("Testing message: 'Hello' string");
    const result = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of result) process.stdout.write(chunk.text || "");
    console.log("\n-> SUCCESS message string\n");
  } catch(e: any) { console.error("-> error:", e.message, "\n"); }

  try {
    console.log("Testing message: { message: 'Hello' }");
    const result2 = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of result2) process.stdout.write(chunk.text || "");
    console.log("\n-> SUCCESS message obj\n");
  } catch(e: any) { console.error("-> error:", e.message, "\n"); }
}
run();
