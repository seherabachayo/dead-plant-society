import express from "express";
const router = express.Router();
import{createPost, getPosts, searchPosts, getThisPost} from "../controllers/post.controller.js"


 router.post("/", createPost);
 router.get("/", getPosts);
 router.get('/search', searchPosts);
 router.get('/:id', searchPosts);

export default router;