import User from "../models/users.js";
import mongoose from "mongoose";
//add google auth 
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
export const getUsers = async (req, res) => {
    console.log("✅ GET /api/users hit");
    try{
        const users = await User.find({});//empty object {} means all objects in db
        res.status(200).json({success: true, data: users});
    }
    catch(error){
        console.log("error getting users:", error.message);
        res.status(500).json({success: false, message: "Server error" });

    }
};

export const createUser = async (req, res) => {
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
 };

 export const updateUser = async (req, res) => {
     const { id } = req.params;
     const user = req.body;//what client wants to update, json of incoming req
 
     //make sure user id is in db
     if (!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({success: false, message: "user not found"});
     }
 
     try{
         const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});//new true means return updated object
         res.status(200).json({success: true, data: updatedUser});
     }
     catch (error) {
         res.status(500).json({success: false, message: "Server Error"});
     }
 };
 
export const deleteUser = async (req, res)=> {
    const{id} = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({success: false, message: "user not found"});
     }

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User removed"});
    }
    catch(error) {
        console.log("error deleting user:", error.message);
        res.status(500).json({sucess: false, message: "Server error"})
    }
 };

 //ADD FOR GOOGLE LOGIN
 export const googleLogin = async(req, res) => {
    console.log("🔐 google-login route HIT");
    const {token} = req.body;
    
    try {
        const check = await client.verifyIdToken({
            token: token, 
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = check.getPayload(); 
        const{email, name, sub} = payload; 

        let user = await User.findOne({email});

        if(!user){
            user = new User({
                username: name, 
                email, 
                password: sub, //dummy value since google account linked
                provider: "google"
            });
            await user.save(); 
        }
        res.status(200).json({success:true, data:user});
    }
    catch(error){
        console.error("Failure to login with Google:", error.message);
        res.status(401).json({success: false, message: "Invalid Google Token"}); 
    }

    }; 

