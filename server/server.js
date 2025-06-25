import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';

import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";
import logRoutes from './routes/log.route.js';

import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



  app.use(cors()); 

// Increase payload limit to 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/users", userRoutes);//calls methods in user.route.js
app.use("/api/comments", commentRoutes);
app.use("/api/post", postRoutes);
app.use('/api/logs', logRoutes);
app.use(express.static(path.join(__dirname, 'client', 'build')));


 //start server

 app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

  connectDB().then(() => {
	app.listen(PORT, () => {
	  console.log("Server started at http://localhost:" + PORT);
	});
  });
  