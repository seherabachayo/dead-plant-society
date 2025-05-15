import User from "../models/users.js";
import mongoose from "mongoose";


export const getUsers = async (req, res) => {
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