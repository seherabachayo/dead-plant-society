import Comment from "../models/comments.js";
import mongoose from "mongoose";
import User from "../models/users.js"



export const createComment = async (req, res) => {
     const{user, content, linkedPostId} = req.body; // client will send this data
     
     const newComment = new Comment({
        user, 
        content, 
        linkedPostId
     });
     try{
        const user = await User.findById(newComment.user); 
        if(!user){
            return res.status(404).json({ success: false, message: "Not a user: login to continue" });
            //navigate to login page? 
        }
        else{
         await newComment.save()//saves to our database
         res.status(201).json({success: true, data: newComment}); }
     } catch(error){
         console.error("Error in creating comment", error.message);
         res.status(500).json({success: false, message: "Sever Error"});
     }
    
 };

 export const getComments = async (req, res) => {
     try{
         const comments = await Comment.find({});
         res.status(200).json({success: true, data: comments});
     }
     catch(error){
         console.log("error getting comments:", error.message);
         res.status(500).json({success: false, message: "Server error" });
 
     }
 };


 export const deleteComment = async (req, res)=> {
     const{id} = req.params;
 
     
     if (!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({success: false, message: "comment not found"});
      }
 
     try{
         await Comment.findByIdAndDelete(id);
         res.status(200).json({success: true, message: "Comment removed"});
     }
     catch(error) {
         console.log("error deleting comment:", error.message);
         res.status(500).json({sucess: false, message: "Server error"})
     }
  };



  export const getLinkedComments = async (req, res) => {
      //http://localhost:5000/api/comments/linked/:id --> searches for all comments with that linked id
         try {
         const { id } = req.params;             
         let filter = {};
     
         if (id) {
           filter.linkedPostId = { 
             $regex: id,
             $options: ''
           };
         }
         
         //change back if doesn't work
         //const comments = await Comment.find(filter);
         const comments = await Comment.find(filter).populate('user', 'username avatar');
        res.status(200).json({success: true, data: comments});
     
         } catch (err) {
           res.status(500).json({ error: err.message });
         }
 };

