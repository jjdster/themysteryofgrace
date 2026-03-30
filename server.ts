import express from "express";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Diagnostic Endpoints ---
app.get("/api/ping", (req, res) => res.json({ status: "PONG" }));

app.get(["/api/logs/status", "/api/logs/status/"], (req, res) => {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  let isConfigured = false;
  let parseError = null;

  if (serviceAccountJson) {
    try {
      JSON.parse(serviceAccountJson);
      isConfigured = true;
    } catch (e: any) {
      parseError = e.message;
    }
  }

  res.json({ 
    status: "ALIVE",
    configured: isConfigured,
    parseError: parseError,
    userEmail: "jjdster@gmail.com",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL
    }
  });
});

// --- Google Logging API ---
app.post("/api/logs/submit", async (req, res) => {
  try {
    const { lesson, interaction } = req.body;
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!serviceAccountJson) {
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

    // Find or create the document
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

    // Share with the user
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
    } catch (e) {}

    // Append log
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
        requests: [{ insertText: { endOfSegmentLocation: {}, text: logText } }],
      },
    });

    res.json({ status: "ok", docId });
  } catch (error: any) {
    console.error("Logging error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- Vite Middleware (Development Only) ---
if (process.env.NODE_ENV !== "production") {
  import("vite").then(async ({ createServer: createViteServer }) => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }).catch(() => {});
} else {
  const distPath = path.join(process.cwd(), "dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) res.sendFile(indexPath);
    });
  }
}

// Start server if not on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
