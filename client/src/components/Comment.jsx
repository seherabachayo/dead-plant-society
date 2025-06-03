import React, { useEffect, useState } from 'react';
import './Comment.css'; 

const Comment = ({ values }) => {
  const [likes, setLikes] = useState(0);
  const [poster,setPoster]=useState({});
  useEffect(() => {
          fetch(
              `http://localhost:5050/api/users/${values.poster}` //fetches poster with same id as in url
          ).then(res => {
              if(!res.ok) throw new Error(res.statusText);
              return res.json(); 
          })
          .then(
              data=>{
                  if(data.success && data.data){
                      setPoster(data.data); 
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
  })

  return (
    <div className="comment">
      <h1 className="username">            {/*user profile pic*/}
        <img className="profile_pic" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s"} alt={`${poster.username}'s profile`} />
        {poster.username}
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