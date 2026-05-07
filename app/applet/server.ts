import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API Routes
  app.get('/api/ping', (req, res) => {
    res.json({ status: 'PONG' });
  });

  app.get('/api/logs/status', (req, res) => {
    res.json({
      status: 'active',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
      }
    });
  });

  app.post('/api/email', (req, res) => {
    console.log('Received email request', req.body);
    // Dummy handler for email, just return OK
    res.json({ success: true });
  });

  // Vite development middleware or static production serving
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
