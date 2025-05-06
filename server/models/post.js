import mongoose from 'mongoose';

// models/Post.js
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or base64 string
    required: false,
  },
  caption: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Post = mongoose.model('Post', postSchema); //create a collection called User using this schema
export default Post;