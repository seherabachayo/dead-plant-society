import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";
import logRoutes from './routes/log.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post", postRoutes);
app.use('/api/logs', logRoutes);

// optional: quick health check
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// for Render deployment
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));
  // SPA fallback for non-API routes
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) return res.sendStatus(404);
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
