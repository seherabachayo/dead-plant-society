import React from 'react';
import Comment from '../components/Comment.jsx';
import './ExpandedPost.css';
//import pic from "/Users/kaibacker/Downloads/4CA0ABB7-D410-4993-BF59-DCE2187E739E.jpg"
//import post_pic from "/Users/kaibacker/Downloads/IMG_0440.jpg"
import Post from '../components/Post.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import {Text, StyleSheet, TextInput, Modal, View, Button} from 'react-native-web';



export default function ExpandPost(){
    const [post, setPost] = useState(null); 
    const [comments, setComments] = useState(null); 
    const [content, setContent] = useState('');
    const [linkedPostId, setLinkedPostId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 
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

    const handleSubmit = async(e) => {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem("user"));  
            if(!user){
                alert("Please log in to comment.");
                navigate("/login"); 
            return; 
            }        
        // console.log(email);
                try {
        const response = await fetch('http://localhost:5050/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            user: user._id,
            content,
            linkedPostId: id,
            }),
        });
        if (!response.ok) {
            throw new Error(`That ain't a comment! Get out! status: ${response.status}`);
        }
       
        const data = await response.json();
        console.log('Comment created:', data);

        const updatedRes = await fetch(`http://localhost:5050/api/comments/linked/${id}`);
        const updatedComments = await updatedRes.json();
        setComments(updatedComments.data);

        setContent(''); 
        // you might redirect or clear the form here
        } catch (err) {
        console.error('Error creating user:', err);
        }
    };


    if (loading) return <p>Loading</p>;
    if (error)   return <p>error!</p>;

    const styles = StyleSheet.create({
            input:{
                borderRadius: 15,
                borderWidth: 2,
                width: 1000,
                height: 90,
                padding: 10,
                paddingBottom: 14,
                paddingTop: 14,
                color: "#000000",
            }
        })

    return(
        <div>
            <div className="page-elmnts">
            <Post post={post} shorten={false} />
            <div className="commenter">
                <p className='comment-header'>Comments?</p>
                <form className='make-comment' onSubmit={handleSubmit}>
                    <TextInput style={styles.input} maxLength={200} editable multiline placeholder='Add your own comment' value={content} onChangeText={setContent}/>
                    <button className='freaky-btn' >Post Comment</button>
                </form>
                { comments && comments.length > 0 ? (
                <div className="comment-container">
                        {comments.map(comment => (
                            <Comment key={comment._id} values={comment}/>
                        ))}
                </div> ) 
                : (<p className="apology">The plants may be dead, but don't let the convo die. Comment first.</p>)
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