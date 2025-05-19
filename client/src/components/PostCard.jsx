import React, {useState} from 'react';
import ReactDOM from 'react-dom';
//import './ExpandPost'
import './PostCard.css';
//import ExpandPost from './ExpandPost';

const PostCard = ({ post }) => {
  const [expandP,doExpand]=useState(false);

  // function handleClick({mpost}) {
  //   doExpand(true);
  // }
  return (
    <button>
    <div className="post-card">
      <div className="img-box">
        <img src={post.imageUrl} alt={post.name} />
      </div>
      <h3>{post.name}</h3>
      <p><strong>Cause:</strong> {post.causeOfDeath}</p>
      <p><em>“{post.epitaph}”</em></p>
      <button onClick={()=>handleClick({post})}>Comments</button>
    </div>
    </button>
  );
  
};


export default PostCard;
