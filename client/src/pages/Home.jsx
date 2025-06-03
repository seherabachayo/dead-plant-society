// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="home-layout">
      {/* Main content column */}
      <div className="home">
        {/* Recent Tributes */}
        <div>
          <h2>Recents Posts</h2>
          <div className="scroll-container">
            {recent.map((content) => (
              <Link
                key={content._id}
                to={`/post/${content._id}`}
                className="post-card"
              >
                {content.image && (
                  <img
                    src={content.image}
                    alt={content.title}
                    className="post-image"
                  />
                )}
                <h3 className="post-title">{content.title}</h3>
                {content.caption && (
                  <p className="post-caption">{content.caption}</p>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* All Posts Feed */}
        <div>
          <h2>All Deaths</h2>
          <div className="content-feed">
            {posts.map((content) => (
              <Link
                key={content._id}
                to={`/post/${content._id}`}
                className="post-card"
              >
                {content.image && (
                  <img
                    src={content.image}
                    alt={content.title}
                    className="post-image"
                  />
                )}
                <h3 className="post-title">{content.title}</h3>
                {content.caption && (
                  <p className="post-caption">{content.caption}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>


        <aside className="obituaries-section">
          <h2>Reasons for Death</h2>
          {posts.map((obituary) => (
            <div key={obituary._id} className="obituary-card">
              <h3>{obituary.title}</h3>
              {obituary.dates && <p>{obituary.dates}</p>}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}