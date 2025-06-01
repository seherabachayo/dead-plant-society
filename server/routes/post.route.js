import express from "express";
const router = express.Router();
import { 
    createPost, 
    getPosts, 
    getPost, 
    updatePost, 
    deletePost 
} from "../controllers/post.controller.js";

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);

// Update post
router.put("/:id", updatePost);

// Delete post
router.delete("/:id", deletePost);

export default router;