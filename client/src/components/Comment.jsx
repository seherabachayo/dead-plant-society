import React,{useState} from 'react';
import './Comment.css'; 
const Comment = (values)=>{
    var [likes,incrementLikes]=useState(0);
    return (
            <div className="Comment">
                <h1>{values.profile_pic} {value.name}</h1>
                <h2>{values.text}</h2>
                <h3>
                    <div>
                    <Button onClick={()=>{Likes++;}}>Likes: {likes};</Button>
                    </div>
                    <div>
                    <Button>Reply?</Button>
                    <Button>View Replies</Button>  // Probably need another state for this
                    </div>
                </h3>

            </div>
    );
};

export default Comment;
