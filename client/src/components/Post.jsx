import React, { useState, useEffect } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function Post({post, shorten=true}){
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [poster, setPoster] = useState({});
    const [commentCount, setCommentCount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!post) return;
        
        // Fetch user data
        const userId = post.user || post.poster; // Check for both user and poster fields
        if (userId) {
            const actualUserId = typeof userId === 'string' ? userId : userId._id;
            fetch(`http://localhost:5050/api/users/${actualUserId}`)
                .then(res => {
                    if(!res.ok) throw new Error(res.statusText);
                    return res.json(); 
                })
                .then(data => {
                    if(data.success && data.data){
                        setPoster(data.data); 
                    } else {
                        throw new Error('Invalid format');
                    }
                })
                .catch(err => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        // Fetch comment count
        if (post._id) {
            fetch(`http://localhost:5050/api/comments/linked/${post._id}`)
                .then(res => {
                    if(!res.ok) throw new Error(res.statusText);
                    return res.json(); 
                })
                .then(data => {
                    if(data.success && Array.isArray(data.data)){
                        setCommentCount(data.data.length); 
                    } else {
                        throw new Error('Invalid format');
                    }
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    }, [post]);

    if (!post) {
        return <p>Loading…</p>;
    }
    
    const { 
        title, 
        caption: body, 
        image, 
        type,
        dates,
        finalMessage,
        createdAt,
    } = post;
    
    //shortens body if > than 200 chars
    const displayBody = shorten && body && body.length > 200
    ? `${body.substring(0, 200)}...`
     : body || '';
    
    const handleLike = () => {
        const user = JSON.parse(localStorage.getItem("user"));  
        if(!user){
            alert("Please log in to add like.");
            return; 
        }        
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const timeAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : '';

    return (
        <div className="post">
            <div className="post-header">
                <div className="user-info">
                    {poster.avatar && (
                        <img 
                            src={poster.avatar} 
                            alt={`${poster.username}'s profile`} 
                            className="user-avatar" 
                        />
                    )}
                    <span className="username">{poster.username}</span>
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
                     {shorten && body.length > 200 && (
                    <Link to={`/post/${post._id}`} className="read-more-link">
                     Read more
                    </Link>
            )}
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
                        💬 {commentCount}
                    </Link>
                </div>
                {post.tags && (
                    <div className="tags">
                        {post.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}