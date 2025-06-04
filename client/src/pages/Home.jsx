// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5050/api/post')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          // Sort newest first
          const sorted = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sorted);
          
          // Calculate categories/death reasons
          const categoryCount = sorted.reduce((acc, post) => {
            const category = post.title || 'Unknown';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          setCategories(categoryCount);
        } else {
          throw new Error('Invalid format');
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p>Error: {error}</p>;

  const recent = posts.slice(0, 3);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="home-layout">
      {/* Main content column */}
      <div className="home-main">
        {/* Recent Tributes */}
        <section className="recent-posts">
          <h2>Recent Posts</h2>
          <div className="recent-posts-grid">
            {recent.map((post) => (
              <div
                key={post._id}
                onClick={() => handlePostClick(post._id)}
                className="recent-post-card"
              >
                <div className="recent-post-image">
                  {post.image && (
                    <img src={post.image} alt={post.title} />
                  )}
                </div>
                <div className="recent-post-content">
                  <h3>{post.title}</h3>
                  {post.caption && <p>{post.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Posts Feed */}
        <section className="all-posts">
          <h2>All Deaths</h2>
          <div className="posts-feed">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => handlePostClick(post._id)}
                className="post-wrapper"
              >
                <Post post={post} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside className="home-sidebar">
        <div className="categories-section">
          <h2>Common Causes of Death</h2>
          <div className="categories-list">
            {Object.entries(categories)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([category]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                </div>
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
}