import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';

import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

  app.use(cors()); 

 app.use(express.json());//allows server to accept json data in req body

app.use("/api/users", userRoutes);//calls methods in user.route.js
app.use("/api/comments", commentRoutes);
app.use("/api/post", postRoutes);
 //start server

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:5000");
	console.log("Server started at http://localhost:" + PORT);
});

