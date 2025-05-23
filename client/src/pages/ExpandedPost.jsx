import React from 'react';
import Comment from '../components/Comment.jsx';
import './ExpandedPost.css';
//import pic from "/Users/kaibacker/Downloads/4CA0ABB7-D410-4993-BF59-DCE2187E739E.jpg"
//import post_pic from "/Users/kaibacker/Downloads/IMG_0440.jpg"
import Post from '../components/Post.jsx'



export default function ExpandPost({post}){
    return(
        <div>
            <div>
            <Post post={post}></Post>
            </div>
            <div className="commenter">Comments?</div>
            <div>
            <Comment values={fake_Comment} />
            </div>
        </div>
    )
}
const fake_Comment = {
    name: "Jed",
    text: "I just got here",
    profile_pic: "https://veryplants.com/cdn/shop/articles/Exotic-succulent-plants.jpg?v=1706711966"
  };
  
  
const fake_post={
    title:"Insert Post title",
    description: "This is the description",
    image: "https://veryplants.com/cdn/shop/articles/Exotic-succulent-plants.jpg?v=1706711966"
}
