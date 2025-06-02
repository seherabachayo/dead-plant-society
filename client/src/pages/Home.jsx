import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';


export default function Home() {
  const [posts, setPosts] = useState([]);       // will hold the fetched posts array
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); //so we can get posts BEFORE displaying them

  useEffect(() => {
    fetch('http://localhost:5050/api/post')
      .then(res => {//runs only when res is fufilled
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        if (data.success && Array.isArray(data.data)) {//make sure we got data in correct format
          const sorted = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sorted);
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
  }, []);
  if (loading) return <p>Loading posts…</p>;//loading so posts dont display before we can get them from DB
  if (error)   return <p>error!</p>;

  // Safely get the top 3 for "Recent Tributes"
  const recent = posts.slice(0, 3);
//scroll container was:
// {dummyPosts.map((post, idx) => (
//  <PostCard key={idx} post={post} />
//  ))}
//only worked for dummy pots what is post card?

    return (
        <div className="home-layout">
            <div className="home">
                <h2>Recent Tributes</h2>
                <div className="scroll-container">
                    {recent.map(content => (
                      <Link to={`/post/${content._id}`}>
                        <Post key={content.id} post={content}/>
                      </Link>
                    ))}
                </div>
                <div className="content-feed">
                    {posts.map(content => (
                      <Link to={`/post/${content._id}`}>
                        <Post key={content.id} post={content}/>
                      </Link>
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
                    {posts.map(obituary => (
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