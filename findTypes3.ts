import fs from "fs";
let file = fs.readFileSync("./node_modules/@google/genai/dist/genai.d.ts", "utf8");
const lines = file.split("\n");
const idx = lines.findIndex(l => l.includes("interface SendMessageParameters"));
console.log(lines.slice(idx - 2, idx + 15).join("\n"));
