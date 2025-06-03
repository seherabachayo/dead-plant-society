import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom';

export default function Post({post}){
    if (!post) {
        return <p>Loading…</p>;
    }
    const { 
        title, 
        body, 
        image, 
        username, 
        likes, 
        comments, 
        tags,
        type,
        dates,
        finalMessage
    } = post;
    

    return (
        
        <div className="post">
            <div className="post-header">
                <div className="user-info">
                    <div className="user-avatar"></div>
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
                <div className="interaction-counts">
                    <span className="likes">{likes}</span>
                    <span className="comments">{comments}</span>
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