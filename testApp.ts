import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI();
const chat = ai.chats.create({ model: "gemini" });
async function test() {
  await chat.sendMessageStream({ message: "hello" });
}
