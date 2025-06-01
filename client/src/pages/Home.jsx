import React from 'react';
import { usePost } from '../context/PostContext';
import Post from '../components/Post';
import PostCard from '../components/PostCard';

const dummyPosts = [
    {
        name: "Basil",
        causeOfDeath: "Overwatered",
        epitaph: "You were tasty. You were loved.",
        imageUrl: "https://via.placeholder.com/300x200?text=RIP+Basil"
    },
    {
        name: "Cactus",
        causeOfDeath: "Underwatered",
        epitaph: "Deserts miss you.",
        imageUrl: "https://via.placeholder.com/300x200?text=Dead+Cactus"
    },
    {
        name: "Fern",
        causeOfDeath: "Forgotten on vacation",
        epitaph: "Lush no more.",
        imageUrl: "https://via.placeholder.com/300x200?text=Fern+Gone"
    }
];

export default function Home() {
    const { posts, obituaries } = usePost();

    // Combine and sort posts and obituaries by creation date
    const allContent = [...posts, ...obituaries].sort((a, b) => 
        b.createdAt - a.createdAt
    );

    return (
        <div className="home-layout">
            <div className="home">
                <h2>Recent Tributes</h2>
                <div className="scroll-container">
                    {dummyPosts.map((post, idx) => (
                        <PostCard key={idx} post={post} />
                    ))}
                </div>
                <div className="content-feed">
                    {allContent.map(content => (
                        <Post key={content.id} post={content} />
                    ))}
                </div>
            </div>
            
            <div className="leaderboard">
                <h2>Leaderboard</h2>
                <br />
                <h3>Top Plant Deaths</h3>
                <ul className="leaderboard-list">
                    <li>1. Basil</li>
                    <li>2. Cactus</li>
                    <li>3. Succulent</li>
                    <li>4. Aloe Vera</li>
                </ul>
                
                <div className="obituaries-section">
                    <h2>Obituaries</h2>
                    {obituaries.map(obituary => (
                        <div key={obituary.id} className="obituary-card">
                            <h3>{obituary.title}</h3>
                            <p>{obituary.dates}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 