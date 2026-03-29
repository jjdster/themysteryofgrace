import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Google Logging API ---
  app.post("/api/logs/submit", async (req, res) => {
    try {
      const { lesson, interaction } = req.body;
      const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

      if (!serviceAccountJson) {
        console.warn("GOOGLE_SERVICE_ACCOUNT_JSON not set. Skipping remote logging.");
        return res.status(200).json({ status: "skipped", message: "Service account not configured" });
      }

      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(serviceAccountJson),
        scopes: [
          "https://www.googleapis.com/auth/documents",
          "https://www.googleapis.com/auth/drive.file",
        ],
      });

      const docs = google.docs({ version: "v1", auth });
      const drive = google.drive({ version: "v3", auth });

      const now = new Date();
      const monthYear = now.toLocaleString("default", { month: "long", year: "numeric" });
      const docName = `Study Logs - ${monthYear}`;

      // 1. Find or create the document
      let docId: string | undefined;
      const searchResponse = await drive.files.list({
        q: `name = '${docName}' and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
        fields: "files(id, name)",
      });

      if (searchResponse.data.files && searchResponse.data.files.length > 0) {
        docId = searchResponse.data.files[0].id!;
      } else {
        const createResponse = await drive.files.create({
          requestBody: {
            name: docName,
            mimeType: "application/vnd.google-apps.document",
          },
        });
        docId = createResponse.data.id!;
      }

      // 2. Append the log entry
      const timestamp = now.toISOString();
      let logText = `\n\n--- ${timestamp} ---\n`;
      logText += `Lesson: ${lesson}\n`;
      
      if (interaction.type === 'question') {
        logText += `Question: ${interaction.data.userQuestion}\n`;
        logText += `AI Response: ${interaction.data.aiResponse}\n`;
      } else if (interaction.type === 'quiz') {
        logText += `Quiz Question: ${interaction.data.question}\n`;
        logText += `User Answer: ${interaction.data.selected}\n`;
        logText += `Correct Answer: ${interaction.data.correct}\n`;
        logText += `Result: ${interaction.data.isCorrect ? 'CORRECT' : 'INCORRECT'}\n`;
      }

      await docs.documents.batchUpdate({
        documentId: docId,
        requestBody: {
          requests: [
            {
              insertText: {
                endOfSegmentLocation: {},
                text: logText,
              },
            },
          ],
        },
      });

      res.json({ status: "ok", docId });
    } catch (error) {
      console.error("Error logging to Google Docs:", error);
      res.status(500).json({ error: "Failed to log to Google Docs" });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
