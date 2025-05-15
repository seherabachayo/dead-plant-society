import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from './models/users.js';//import schema
import mongoose from 'mongoose';
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
 app.use(express.json());//allows server to accept json data in req body

app.use("/api/users", userRoutes);//calls methods in user.route.js

 //start server
app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:5000");
});