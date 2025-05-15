import express from "express";
import mongoose from "mongoose";
import User from '../models/users.js'
const router = express.Router();

//get all users
router.get("/", async (req, res) => {
    try{
        const users = await User.find({});//empty object {} means all objects in db
        res.status(200).json({success: true, data: users});
    }
    catch(error){
        console.log("error getting users:", error.message);
        res.status(500).json({success: false, message: "Server error" });

    }
});


 //server post adds user to db
 router.post("/", async (req, res) => {
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
 router.delete("/:id", async (req, res)=> {
    const{id} = req.params;
    console.log("id:", id);

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User removed"});
    }
    catch(error) {
        console.log("error deleting user:", error.message);
        res.status(404).json({sucess: false, message: "User not found"})
    }
 });


//update user information
//use patch if updating some object info and put to update all of it
router.put("/:id", async (req, res) => {
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
});

export default router;
