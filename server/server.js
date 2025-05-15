import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from './models/users.js';//import schema
import mongoose from 'mongoose';
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Route for the root path
app.get("/", (req, res) => {
    res.send("Welcome to the server!"); // Or any other response you want
  });
  
// Server get request for /users
app.get("/users", (req, res) => {
    res.json({ message: "List of users will go here" }); // Example response
  });
  
app.listen(5000, () =>{ 
    connectDB(); // connect database before starting server
    console.log('Server is at http://localhost:5000/');
});