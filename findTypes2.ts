import fs from "fs";
let file = fs.readFileSync("./node_modules/@google/genai/dist/genai.d.ts", "utf8");
console.log(file.includes("SendMessageParameters"));
const lines = file.split("\n");
const idx = lines.findIndex(l => l.includes("SendMessageParameters"));
console.log(lines.slice(idx - 5, idx + 15).join("\n"));
