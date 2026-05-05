import fs from "fs";
const file = fs.readFileSync("./node_modules/@google/genai/dist/src/models/chat_session.d.ts", "utf8");
console.log(file);
