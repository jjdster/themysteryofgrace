import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({});
  const chat = ai.chats.create({ model: "gemini-3-flash-preview" });
  console.log("---- Testing string ----");
  try {
    const result = await chat.sendMessageStream("Hello as string");
    for await (const chunk of result) process.stdout.write(chunk.text || "");
    console.log("\n-> String SUCCESS\n");
  } catch(e: any) { console.error("-> string error:", e.message, "\n"); }

  console.log("---- Testing { message } ----");
  try {
    const chat2 = ai.chats.create({ model: "gemini-3-flash-preview" });
    const result2 = await chat2.sendMessageStream({ message: "Hello as object" });
    for await (const chunk of result2) process.stdout.write(chunk.text || "");
    console.log("\n-> {message} SUCCESS\n");
  } catch(e: any) { console.error("-> object error:", e.message, "\n"); }
}
run();
