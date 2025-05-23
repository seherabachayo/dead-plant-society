import React, { useState } from 'react';
import './Comment.css'; 

const Comment = ({ values }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="comment">
      <h1 className="username">
        <img className="profile_pic" src={values.profile_pic} alt={`${values.name}'s profile`} />
        {values.name}
      </h1> 
      
      <h2 className="comment_text">{values.text}</h2>

      <div className="comment_buttons">
        <button onClick={() => setLikes(likes + 1)}>Likes: {likes}</button>
        <button>Reply?</button>
        <button>View Replies</button>
      </div>
    </div>
  );
};

export default Comment;