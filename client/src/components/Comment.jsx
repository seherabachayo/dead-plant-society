import React, { useState } from 'react';
import './Comment.css'; 

const Comment = ({ values }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="comment">
      <h1 className="username">
        <img className="profile_pic" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s"} alt={`${values.name}'s profile`} />
        {values.name}
      </h1> 
      
      <h2 className="comment_text">{values.content}</h2>

      <div className="comment_buttons">
        <button onClick={() => setLikes(likes + 1)} className='freaky-btn'>Likes: {likes}</button>
        <button className='freaky-btn'>Reply?</button>
        <button className='freaky-btn'>View Replies</button>
      </div>
    </div>
  );
};

export default Comment;