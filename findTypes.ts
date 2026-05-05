import fs from "fs";
try {
  let file = fs.readFileSync("./node_modules/@google/genai/dist/src/models/chat_session.d.ts", "utf8");
  console.log(file.substr(0, 500));
} catch (e) {
  let web = fs.readFileSync("./node_modules/@google/genai/types.d.ts", "utf8");
  console.log(web.substr(0, 500));
}
