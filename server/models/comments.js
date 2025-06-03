import mongoose from 'mongoose';
//comment schema

const commentSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true

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