import React, { useState, useEffect } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function Post({post}){
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    if (!post) {
        return <p>Loading…</p>;
    }
    
    const { 
        title, 
        body, 
        image, 
        username, 
        avatar,
        comments, 
        tags,
        type,
        dates,
        finalMessage,
        createdAt
    } = post;
    
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const timeAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : '';

    return (
        <div className="post">
            <div className="post-header">
                <div className="user-info">
                    {avatar && <img src={avatar} alt={username} className="user-avatar" />}
                    <span className="username">{username}</span>
                </div>
                <h2 className="title">{title}</h2>
            </div>

            {type === 'obituary' ? (
                <div className="obituary-content">
                    <div className="dates">{dates}</div>
                    <div className="final-message">{finalMessage}</div>
                </div>
            ) : (
                <div className="post-content">
                    {image && (
                        <div className="image-container">
                            <img src={image} alt={title} className="post-image" />
                        </div>
                    )}
                    <div className="body">{body}</div>
                </div>
            )}

            <div className="post-footer">
                <div className="post-metadata">
                    <span className="post-time">{timeAgo}</span>
                </div>
                <div className="interaction-counts">
                    <button 
                        className={`like-button ${isLiked ? 'liked' : ''}`} 
                        onClick={handleLike}
                    >
                        {isLiked ? '❤️' : '🤍'} {likes}
                    </button>
                    <Link to={`/post/${post._id}`} className="comment-count">
                        💬 {comments?.length || 0}
                    </Link>
                </div>
                <div className="tags">
                    {tags && tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}