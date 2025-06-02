import express from "express";
const router = express.Router();
import{createPost, getPosts, searchPosts, getThisPost, getOnePost} from "../controllers/post.controller.js"


 router.post("/", createPost);
 router.get("/", getPosts);
 router.get("/:id", getOnePost); 
 router.get('/search', searchPosts);
 router.get('/:id', searchPosts);

export default router;