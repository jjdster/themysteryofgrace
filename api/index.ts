import express from "express";

const app = express();
app.use(express.json());

// --- 1. Minimal Diagnostic Endpoint (Must be first) ---
app.get("/api/ping", (req, res) => {
  try {
    res.json({ 
      status: "PONG", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL
    });
  } catch (e: any) {
    res.status(500).send(`Ping Error: ${e.message}`);
  }
});

// --- 2. Status Endpoint ---
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

// --- 3. Google Logging API (Lazy Loaded) ---
app.post("/api/logs/submit", async (req, res) => {
  try {
    const { google } = await import("googleapis");
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

// --- Global Error Handler ---
app.use((err: any, req: any, res: any, next: any) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export const serverApp = app;

export default (req: any, res: any) => {
  try {
    return app(req, res);
  } catch (e: any) {
    res.status(500).json({ 
      error: "Vercel Entry Point Error", 
      message: e.message,
      stack: e.stack 
    });
  }
};
