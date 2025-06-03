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


  export const getThisPost = async (req, res) => {
     //http://localhost:5050/api/post/:id --> searches for user id
        const { id } = req.params;
        const user = req.body;//what client wants to update, json of incoming req
     
         //make sure user id is in db
         if (!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({success: false, message: "post not found"});
         }
     
         try {
        //find the user by id
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ success: false, message: "Post not found" });
        }
    
        return res.status(200).json({ success: true, data: post });
        } 
        catch (error) {
            return res.status(500).json({ success: false, message: "Server Error" });
        }
        };

export const getMyPosts = async (req, res) => {
              
            try {
            const { id } = req.params;             
            let filter = {};
            if (id) {
                filter.poster = { 
                    $regex: id,
                    $options: ''
                   };
            }
                 
            const posts = await Post.find(filter).populate();
            res.status(200).json({success: true, data: posts});
             
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
         };