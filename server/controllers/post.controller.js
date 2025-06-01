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


 export const getPosts = async (req, res) => {
      try{
          const posts = await Post.find({});
          res.status(200).json({success: true, data: posts});
      }
      catch(error){
          console.log("error getting posts:", error.message);
          res.status(500).json({success: false, message: "Server error" });
  
      }
  };

  export const searchPosts = async (req, res) => {
    //http://localhost:5000/api/post/search?search=key --> searches for key word key
    try {
    const { search } = req.query;             
    let filter = {};

    if (search) {
      filter.caption = { 
        $regex: search,
        $options: ''
      };
    }

    const posts = await Post.find(filter);
    res.json(posts);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };