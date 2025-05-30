import express from "express";
const router = express.Router();
import{createComment, getComments, deleteComment} from "../controllers/comment.controller.js"



 //server post adds comment to db
 router.post("/", createComment);

 router.get("/", getComments);

 router.delete("/:id", deleteComment);

export default router;