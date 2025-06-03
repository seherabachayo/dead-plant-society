
import Diary from "../models/diary.js";
import mongoose from "mongoose";

export const createDiary = async (req, res) => {
     const diary = req.body; // client will send this data
     
     const newDiary = new Diary(diary);
     try{
         await newDiary.save()//saves to our database
         res.status(201).json({success: true, data: newDiary});
     } catch(error){
         console.error("Error in creating diary", error.message);
         res.status(500).json({success: false, message: "Sever Error"});
     }
 };


 export const getDiary = async (req, res) => {
      try{
          const diaries = await Diary.find({});
          res.status(200).json({success: true, data: diaries});
      }
      catch(error){
          console.log("error getting diary:", error.message);
          res.status(500).json({success: false, message: "Server error" });
  
      }
  };

  export const deleteDiary = async (req, res)=> {
       const{id} = req.params;
   
       
       if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "comment not found"});
        }
   
       try{
           await Diary.findByIdAndDelete(id);
           res.status(200).json({success: true, message: "Comment removed"});
       }
       catch(error) {
           console.log("error deleting comment:", error.message);
           res.status(500).json({sucess: false, message: "Server error"})
       }
    };


  