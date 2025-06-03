import express from "express";
const router = express.Router();
import{createDiary, deleteDiary, getDiary} from "../controllers/diaries.controller.js"


 router.post("/", createDiary);
 router.get("/", getDiary);
 router.delete('/:id', deleteDiary);
 

export default router;