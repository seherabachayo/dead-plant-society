import React, { useEffect, useState } from 'react';
import './Comment.css'; 

const Comment = ({ values }) => {
  const [likes, setLikes] = useState(0);
  const [poster,setPoster]=useState({});
  const[error,setError]=useState(''); 
  const[loading,setLoading]=useState(true); 
  useEffect(() => {
    let userId; 
    if(typeof values.user === 'string'){
      userId = values.user; 
    }

    else if(values.user && values.user._id){
      userId = values.user._id; 
    }
    else{
      console.warn("Comment user format is invalid, lil bro:", values.user); 
      return; 
    }
          fetch(
              `/api/users/${userId}` //fetches poster with same id as in url
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
  }, []);

  return (
    <div className="comment">
        <h1 className="username">
        <img className="profile_pic"
         src={poster.avatar} 
         alt={`${poster.username}'s profile`} />
        {poster.username}      </h1> 
      
      <h2 className="comment_text">{values.content}</h2>

      
    </div>
  );
};

export default Comment;