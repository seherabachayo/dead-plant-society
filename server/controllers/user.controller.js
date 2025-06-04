import User from "../models/users.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'; //to encrypt password in database 
import { OAuth2Client } from "google-auth-library" //add google auth


//add default profile pic, will assign 1 of 6 on random 

const listofAvatars = [
 "https://c02.purpledshub.com/uploads/sites/40/2023/06/julyflowerhero.jpg?w=1029&webp=1",
 "https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-variety-of-succulent-plants-royalty-free-image-1584462052.jpg",
 
 "https://hips.hearstapps.com/hmg-prod/images/beautiful-pink-flowers-of-astrantia-major-a-summer-royalty-free-image-1709585164.jpg", 
 "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:2000,ch:1125,q:80,w:2000/gFiEjR6MkaYHmkfgGanByD.png",
 


]

//randomized profile pic function 
const getRandomAvatar= () => {
    return listofAvatars[Math.floor(Math.random() * listofAvatars.length)];
}; 



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

//non-google login process 
export const login = async(req, res) => {

const {email, password } = req.body; 
try{
    const user = await User.findOne({email});
    if(!user || user.provider != 'local'){
        return res.status(401).json({success:false, message:'Invalid email or password'});

    }

    const match = await(bcrypt.compare(password,user.password))
    if(!match){
        return res.status(401).json({success:false, message:'Invalid password'})
    }
     
   

    //want to send user confirmation to frontend 
    const {password: _, ...userData} = user.toObject();
    res.status(200).json({
        success: true,
        data: userData,
      });
  
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };




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
     try{

         const isExistingUser = await User.findOne({email: user.email});

        if(isExistingUser){
            return res.status(409).json({success: false, message:"Email already registered"})
        }
     
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({
          ...user,
          password: hashedPassword,
          provider: "local", 
          avatar: getRandomAvatar()

        }); 
         await newUser.save()//saves to our database
         res.status(201).json({success: true, data: newUser});//201 when success and something was created
    }catch(error){
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
    const {token} = req.body;
    
    try {
        const check = await client.verifyIdToken({
            idToken: token, 
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
                provider: "google",
                avatar: getRandomAvatar()
            });
            await user.save(); 
        }
          
          //return user 
          const{password: _, ...userData} = user.toObject(); 

        res.status(200).json({success:true, data:userData});
    }
    catch(error){
        console.error("Failure to login with Google:", error.message);
        res.status(401).json({success: false, message: "Invalid Google Token"}); 
    }

    }; 




    export const searchUsers = async (req, res) => {
        //http://localhost:5000/api/users/:id --> searches for user id
        const { id } = req.params;
        const user = req.body;//what client wants to update, json of incoming req
 
     //make sure user id is in db
     if (!mongoose.Types.ObjectId.isValid(id)){
         return res.status(404).json({success: false, message: "user not found"});
     }
 
     try {
    //find the user by id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
    } 
    catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
    };