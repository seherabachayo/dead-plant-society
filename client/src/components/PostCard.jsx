import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="img-box">
        <img src={post.imageUrl} alt={post.name} />
      </div>
      <h3>{post.name}</h3>
      <p><strong>Cause:</strong> {post.causeOfDeath}</p>
      <p><em>“{post.epitaph}”</em></p>
    </div>
  );
};

export default PostCard;
