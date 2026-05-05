import { GoogleGenAI } from "@google/genai";
async function run() {
  const ai = new GoogleGenAI({});
  const chat = ai.chats.create({ model: "gemini-3-flash-preview"});
  chat.sendMessageStream("Hello");
}
