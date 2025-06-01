import mongoose from 'mongoose';

// models/post.js
const postSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['post', 'obituary'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: function() { return this.type === 'post'; }
  },
  dates: {
    type: String,
    required: function() { return this.type === 'obituary'; }
  },
  finalMessage: {
    type: String,
    required: function() { return this.type === 'obituary'; }
  },
  images: [{
    type: String, // URLs of images
  }],
  username: {
    type: String,
    default: 'Anonymous'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: String
  }]
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Post = mongoose.model('Post', postSchema); //create a collection called Post using this schema
export default Post;