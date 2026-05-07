import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();
async function run() {
  try {
    const ai = new GoogleGenAI({});
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
    });
    const result = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of result) console.log(chunk.text);
  } catch (e) {
    console.error("error:", e);
  }
}
run();
