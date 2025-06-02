import express from "express";
const router = express.Router();
import{createComment, getComments, deleteComment, getLinkedComments} from "../controllers/comment.controller.js"



 //server post adds comment to db
 router.post("/", createComment);

 router.get("/", getComments);


 //only get comments assciated with some id
 router.get("/linked/:id", getLinkedComments);

 router.delete("/:id", deleteComment);

export default router;