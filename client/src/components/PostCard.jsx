import React, { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [expandP, doExpand] = useState(false);

  function handleClick() {
    doExpand(true);
    // you can use expandP to show more content later
  }

  return (
    <div className="post-card">
      <div className="img-box">
        <img src={post.imageUrl} alt={post.name} />
      </div>
      <h3>{post.name}</h3>
      <p><strong>Cause:</strong> {post.causeOfDeath}</p>
      <p><em>“{post.epitaph}”</em></p>
      <button onClick={handleClick}>Comments</button>
    </div>
  );
};

export default PostCard;