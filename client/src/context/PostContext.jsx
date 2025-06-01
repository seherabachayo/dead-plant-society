import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export function usePost() {
    return useContext(PostContext);
}

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [obituaries, setObituaries] = useState([]);

    // Mock data structure for a post
    const defaultPost = {
        id: '',
        type: 'post',
        title: '',
        body: '',
        images: [],
        username: '',
        likes: 0,
        comments: [],
        tags: [],
        createdAt: null
    };

    // Mock data structure for an obituary
    const defaultObituary = {
        id: '',
        type: 'obituary',
        title: '',
        dates: '',
        finalMessage: '',
        username: '',
        likes: 0,
        comments: [],
        tags: [],
        createdAt: null
    };

    const addPost = (postData) => {
        const newPost = {
            ...defaultPost,
            ...postData,
            id: Date.now().toString(),
            createdAt: new Date(),
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const addObituary = (obituaryData) => {
        const newObituary = {
            ...defaultObituary,
            ...obituaryData,
            id: Date.now().toString(),
            createdAt: new Date(),
        };
        setObituaries(prev => [newObituary, ...prev]);
    };

    const value = {
        posts,
        obituaries,
        addPost,
        addObituary,
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
} 