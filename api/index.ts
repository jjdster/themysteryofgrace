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
