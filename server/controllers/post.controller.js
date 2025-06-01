import Post from "../models/post.js";
import mongoose from "mongoose";

// Helper function for error responses
const handleError = (res, error, message = "Server Error") => {
    console.error(`Error: ${message}:`, error.message);
    return res.status(500).json({ success: false, message });
};

// Helper function for not found responses
const handleNotFound = (res, message = "Post not found") => {
    return res.status(404).json({ success: false, message });
};

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleNotFound(res);
        return false;
    }
    return true;
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch(error) {
        handleError(res, error, "Error in creating post");
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('comments');
        res.status(200).json({ success: true, data: posts });
    } catch(error) {
        handleError(res, error, "Error getting posts");
    }
};

// Get a single post by ID
export const getPost = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id, res)) return;
    
    try {
        const post = await Post.findById(id).populate('comments');
        if (!post) return handleNotFound(res);
        res.status(200).json({ success: true, data: post });
    } catch(error) {
        handleError(res, error, "Error getting post");
    }
};

// Update a post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id, res)) return;
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            req.body,
            { new: true }
        ).populate('comments');
        
        if (!updatedPost) return handleNotFound(res);
        res.status(200).json({ success: true, data: updatedPost });
    } catch(error) {
        handleError(res, error, "Error updating post");
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id, res)) return;
    
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) return handleNotFound(res);
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch(error) {
        handleError(res, error, "Error deleting post");
    }
};