import express from "express";
const router = express.Router();
import{createPost, getPosts, searchPosts, getThisPost, getMyPosts} from "../controllers/post.controller.js"


 router.post("/", createPost);
 router.get("/", getPosts);
 
 router.get('/search', searchPosts);
 router.get('/:id', getThisPost);
 router.get('/myPosts/:id', getMyPosts);

export default router;