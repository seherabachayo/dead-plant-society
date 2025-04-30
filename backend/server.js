import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

//server get request
app. get("/users", (req, res) => {});




app.listen(5000, () =>{ 
    connectDB(); // connect database before starting server
    console.log('Server is at http://localhost:5000/');
});