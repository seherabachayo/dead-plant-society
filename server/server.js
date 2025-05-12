import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from './models/users.js';//import schema

dotenv.config();
const app = express();
 app.use(express.json());//allows server to accept json data in req body


 //server get request
 //app. get("/users", (req, res) => {});
 app.post("/api/users", async (req, res) => {
     const user = req.body; // client will send this data
     if(!user.username || !user.password){
         return res.status(400).json({ success:false, message: "Please enter username and password"});
     }
     
     //User=from our product model users.js, user=from client
     const newUser = new User(user);
     try{
         await newUser.save()//saves to our database
         res.status(201).json({success: true, data: newUser});//201 when success and something was created
     } catch(error){
         console.error("Error in creating user", error.message);
         res.status(500).json({success: false, message: "Sever Error"});
     }
 });

 //to delete users in database
 app.delete("/api/users/:id", async (req, res)=> {
    const{id} = req.params;
    console.log("id:", id);

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User removed"});
    }
    catch(error) {
        res.status(404).json({sucess: false, message: "User not found"})
    }
 });


app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:5000");
});