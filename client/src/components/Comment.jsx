import React,{useState} from 'react';
import './Comment.css'; 
const Comment = ({values})=>{
    let [likes,incrementLikes]=useState(0);

    const add_like = ()=>{
        incrementLikes(likes+1);
    }

    return (//put profile pic in here later. Also probably going to need another state for the replies
            <div>
                <h1 className="username">
                    <img className="profile_pic" src={values.profile_pic}/>

                    {values.name}
                </h1> 
                <h2 className="comment_text">{values.text}</h2>
                <h3>
                    <div className="comment_text">
                    <button onClick={()=>{add_like()}}>Likes: {likes}</button>
                    <button>Reply?</button>
                    <button>View Replies</button>  
                    </div>
                </h3>
                
            </div>
    );
};

export default Comment;
