import express from "express";
const router = express.Router();
import{createPost, getPosts, searchPosts} from "../controllers/post.controller.js"


 router.post("/", createPost);
 router.get("/", getPosts);
 router.get('/search', searchPosts);

export default router;