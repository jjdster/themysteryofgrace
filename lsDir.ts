import fs from "fs";
const files = fs.readdirSync("./node_modules/@google/genai/");
console.log(files);
