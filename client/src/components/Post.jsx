import React from 'react'
import './Post.css'


export default function Post({post}){

    return (
        <div>
            <div className="title">
                {post.title}
            </div>
            <img className="post_image" src={post.image}/>
            <div className="description">
                {post.description}
            </div>
        </div>
    )
}