import express from "express";
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("EMAIL_USER or EMAIL_PASS is missing. Flagged comments will not be emailed.");
}

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

// --- 2. Email Endpoint for Flagged Comments ---
app.post("/api/email", async (req, res) => {
  const { authorName, text, attitude } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Moderation" <${process.env.EMAIL_USER}>`,
        to: 'jjdster@gmail.com',
        subject: 'Flagged Comment on Preaching of Jesus Christ',
        html: `
          <h3>A comment was flagged by AI moderation</h3>
          <p><strong>Author:</strong> ${authorName}</p>
          <p><strong>Comment:</strong> ${text}</p>
          <p><strong>AI Assessment:</strong> ${attitude}</p>
          <p><strong>Status:</strong> Flagged (Not visible on site)</p>
        `
      });
    }
    res.json({ success: true });
  } catch (error: any) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// --- 3. Status Endpoint ---
app.get(["/api/logs/status", "/api/logs/status/"], (req, res) => {
  res.json({ 
    status: "ALIVE",
    userEmail: "jjdster@gmail.com",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL
    }
  });
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

