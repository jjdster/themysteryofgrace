import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const ai = new GoogleGenAI({});
  const systemInstruction = "You MUST prioritize and defer to the Scriptures (King James Bible and New International Version)... \n\n SCRIPTURES:\nJohn 3:16: For God so loved the world...";

  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction,
    }
  });
  
  try {
    const msg = "When did the church begin?";
    console.log("Asking:", msg);
    const result = await chat.sendMessageStream({ message: msg });
    let text = "";
    for await (const chunk of result) {
       text += chunk.text || "";
    }
    console.log("-> Response length:", text.length);
    console.log("-> Response:", text.substring(0, 500));
  } catch(e: any) { console.error("-> error:", e.message, "\n"); }
}
run();
