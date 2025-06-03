import React from 'react';
import Comment from '../components/Comment.jsx';
import './ExpandedPost.css';
//import pic from "/Users/kaibacker/Downloads/4CA0ABB7-D410-4993-BF59-DCE2187E739E.jpg"
//import post_pic from "/Users/kaibacker/Downloads/IMG_0440.jpg"
import Post from '../components/Post.jsx'
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'; 



export default function ExpandPost(){
    const [post, setPost] = useState(null); 
    const [comments, setComments] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); 
    let {id} = useParams(); 
    
    useEffect(() => {
        fetch(
            `http://localhost:5050/api/post/${id}` //fetches post with same id as in url
        ).then(res => {
            if(!res.ok) throw new Error(res.statusText);
            return res.json(); 
        })
        .then(
            data=>{
                if(data.success && data.data){
                    setPost(data.data); 
                }
                else{
                throw new Error('Invalid format');
                }
            })
            .catch(err => {
            setError(err.message);
        })
      .finally(() => {
        setLoading(false);
      });


      //fetching comments 
      fetch(
            `http://localhost:5050/api/comments/linked/${id}`
        ).then(res => {
            if(!res.ok) throw new Error(res.statusText);
            return res.json(); 
        })
        .then(
            data=>{
                if(data.success && Array.isArray(data.data)){
                    setComments(data.data); 
                }
                else{
                throw new Error('Invalid format');
                }
            })
            .catch(err => {
            setError(err.message);
        })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const content = e.target.elements.commentContent.value; 
  
   if(!user){
       alert("Please log in to comment.");
       return; 
   }

   const response = await fetch("http://localhost:5050/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        user: user._id,
        content,
        linkedPostId: id
    })
});

   const result = await response.json();
if (result.success) {
    setComments(prev => [...prev, result.data]);
    e.target.reset();
} else {
    alert("Failed to post comment.");
}
};

    if (loading) return <p>Loading</p>;
    if (error)   return <p>error!</p>;

    return(
        <div>
            <div className="page-elmnts">
            <Post post={post}></Post>
            <div className="commenter">
                <p className='comment-header'>Comments?</p>
                { comments && comments.length > 0 ? (
                <div className="comment-container">
                        {comments.map(comment => (
                            <Comment key={comment._id} values={comment}/>
                        ))}
                </div> ) 
                : (<p className="apology">Sorry, there are no comments.</p>)
                }
            </div>
            </div>

        </div>
    )
}

/* use this {post = fake_post} to test actually 
const fake_Comment = {
    name: "Jed",
    text: "I just got here",
    //profile_pic: "https://veryplants.com/cdn/shop/articles/Exotic-succulent-plants.jpg?v=1706711966"
  };
  
  
const fake_post={
    title:"Insert Post title",
    description: "This is the description",
    //image: "https://veryplants.com/cdn/shop/articles/Exotic-succulent-plants.jpg?v=1706711966"
}

*/