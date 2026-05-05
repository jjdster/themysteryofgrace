import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({});
  const chat = ai.chats.create({ model: "gemini-3-flash-preview", config: { systemInstruction: "be concise" } });
  try {
    const result = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of result) {
      console.log(typeof chunk.text, chunk.text);
    }
  } catch (e) {
    console.error("Error with object", e);
  }
}
run();
