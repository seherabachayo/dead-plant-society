import mongoose from 'mongoose';

// models/diary.js
const diarySchema = new mongoose.Schema({
  plant: {
    type: String,
    required: true,
  },
  category: {
    type: String, // URL or base64 string
    required: false,
  },
  symptoms: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
}, 
);

const Diary = mongoose.model('Diary', diarySchema); //create a collection called Diary using this schema
export default Diary;