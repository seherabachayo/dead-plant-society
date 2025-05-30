import Post from "../models/post.js";
import mongoose from "mongoose";



export const createPost = async (req, res) => {
     const post = req.body; // client will send this data
     
     const newPost = new Post(post);
     try{
         await newPost.save()//saves to our database
         res.status(201).json({success: true, data: newPost});
     } catch(error){
         console.error("Error in creating post", error.message);
         res.status(500).json({success: false, message: "Sever Error"});
     }
 };