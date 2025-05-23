import mongoose from 'mongoose';
//comment schema

const userSchema = new mongoose.Schema({
    poster:{
        type: String,
        required: true
    },
    content:
    {
        type: String,
        required: true
    },
   

    timestamps : true
});

const Comment = mongoose.model('Comment', commentSchema); 
//creates comments collection in db
export default Comment;