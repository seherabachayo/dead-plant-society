import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css';
import PostCard from './PostCard';

export default function MyProfile() {
  const [overview, setOverview] = useState(true);
  const [showPosts, setShowPosts] = useState(false);

  const [user, setUser] = useState(null);
  const [text, setText] = useState(
    "Welcome to the Dead Plant Society! try not to kill anything"
  );

  // Holds the array of posts fetched from /post/myPosts/:id
  const [myPostsData, setMyPostsData] = useState([]);

  // Optional: track loading / error states if you want to show feedback
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Whenever `showPosts` flips to true, fetch that user's posts.
  useEffect(() => {
    if (showPosts && user?._id) {
      setLoadingPosts(true);
      setPostsError(null);

      fetch(`http://localhost:5050/api/post/myPosts/${user._id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Server responded with ${res.status}`);
          return res.json();
        })
        .then((json) => {
          // Assuming your controller returns { success: true, data: [ ... ] }
          setMyPostsData(json.data || []);
        })
        .catch((err) => {
          setPostsError(err.message);
        })
        .finally(() => {
          setLoadingPosts(false);
        });
    }
  }, [showPosts, user]);

  if (!user) {
    return <div className="loading-placeholder">Loading profile…</div>;
  }

  return (
    <div>
      <div className="da-pfp-info">
        <img className="da-user-pfp" src={user.avatar} alt={`${user.username}’s avatar`} />
        <div className="da-user-info">
          <div className="name-plus-edit">
            <p className="da-user-name">{user.username}</p>
            <Link to="/edit-profile">
              <button className="editBtn">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="category-buttons">
        <button
          className="stat-button"
          onClick={() => {
            setOverview(true);
            setShowPosts(false);
          }}
        >
          Overview
        </button>
        <button
          className="stat-button"
          onClick={() => {
            setShowPosts(true);
            setOverview(false);
          }}
        >
          Posts
        </button>
      </div>

      <div className="maybe-display">
        {overview && (
          <div className="overview-display">
            <p>{text}</p>
            <button onClick={() => setText("Murderer! Make a post about it to feel better.")}>
              Click me when you kill a plant
            </button>
          </div>
        )}

        {showPosts && (
          <div className="posts-display">
            {loadingPosts && <p>Loading posts…</p>}
            {postsError && <p className="error-message">Error: {postsError}</p>}
            {!loadingPosts && !postsError && myPostsData.length === 0 && (
              <p>No posts to display.</p>
            )}
            {!loadingPosts &&
              !postsError &&
              myPostsData.map((post) => (
                <div
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="post-card"
                  >
                  {post.image && (
                  <img
                   src={post.image}
                  alt={post.title}
                  className="post-image"
                   />
                  )}
                  <h3 className="post-title">{post.title}</h3>
                  {post.caption && (
                   <p className="post-caption">{post.caption}</p>
                   )}
                      </div>        
              ))}
          </div>
         
        )}
      </div>
    </div>
  );
}