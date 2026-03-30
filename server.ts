import express from "express";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

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
          "https://www.googleapis.com/auth/drive",
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

      // 2. Share with the user (jjdster@gmail.com) so it appears in their Drive
      try {
        await drive.permissions.create({
          fileId: docId,
          requestBody: {
            type: "user",
            role: "writer",
            emailAddress: "jjdster@gmail.com",
          },
          sendNotificationEmail: false,
        });
      } catch (shareError: any) {
        // Silently ignore if already shared or permission error
        console.log("Sharing status:", shareError.message || "Already shared or permission granted");
      }

      // 3. Append the log entry
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
    } catch (error: any) {
      console.error("Error logging to Google Docs:", error);
      
      // Fallback: Log to local file if Google Docs fails
      try {
        const logDir = path.join(process.cwd(), "logs");
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        
        const logFile = path.join(logDir, `study-logs-${new Date().toISOString().split('T')[0]}.txt`);
        const logEntry = JSON.stringify({ 
          timestamp: new Date().toISOString(), 
          ...req.body,
          error: error.message || "Unknown error"
        }) + "\n";
        
        fs.appendFileSync(logFile, logEntry);
        console.log("Logged to local fallback file successfully.");
        
        // Return 200 even if remote failed, but indicate the fallback
        return res.status(200).json({ 
          status: "fallback", 
          message: "Remote quota exceeded, logged locally.",
          error: error.message 
        });
      } catch (localError) {
        console.error("Critical: Local fallback logging also failed:", localError);
      }

      res.status(500).json({ error: "Failed to log to Google Docs and local fallback" });
    }
  });

  app.get(["/api/logs/status", "/api/logs/status/"], (req, res) => {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    res.json({ 
      status: "ALIVE",
      configured: !!serviceAccountJson,
      userEmail: "jjdster@gmail.com",
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL
      }
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    import("vite").then(async ({ createServer: createViteServer }) => {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }).catch(err => {
      console.error("Failed to load Vite:", err);
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("Not Found");
        }
      });
    }
  }

  // Global Error Handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled Server Error:", err);
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

export default app;
