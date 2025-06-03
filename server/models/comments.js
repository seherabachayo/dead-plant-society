import mongoose from 'mongoose';
//comment schema

const commentSchema = new mongoose.Schema({
    poster:{
        type: String,
        required: false
    },
    content:
    {
        type: String,
        required: true
    },

    linkedPostId:{
        type: String,
        required: true
    }
   

    
});

const Comment = mongoose.model('Comment', commentSchema); 
//creates comments collection in db
export default Comment;