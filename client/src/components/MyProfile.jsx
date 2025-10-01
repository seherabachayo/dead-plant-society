import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyProfile.css';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [myPostsData, setMyPostsData] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(null);
  const [text, setText] = useState(
              "Welcome to the Dead Plant Society! try not to kill anything"
          );

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      setLoadingPosts(true);
      setPostsError(null);

      fetch(`/api/post/myPosts/${user._id}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Server responded with ${res.status}`);
          return res.json();
        })
        .then((json) => {
          setMyPostsData(json.data || []);
        })
        .catch((err) => {
          setPostsError(err.message);
        })
        .finally(() => {
          setLoadingPosts(false);
        });
    }
  }, [user]);

  if (!user) {
    return <div className="loading-placeholder">Loading profile…</div>;
  }

  return (
    <div>
      <div className="da-pfp-info">
        <img className="da-user-pfp" src={user.avatar} alt={`${user.username}'s avatar`} />
        <div className="da-user-info">
          <div className="name-plus-edit">
            <p className="da-user-name">{user.username}</p>
            <Link to="/edit-profile">
              <button className="editBtn">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text">{text}</div>
        <button className="funBtn" onClick={() => setText("Murderer! Make a post about it to feel better.")}>
            Click me when you kill a plant
        </button>
        <div className = "heP"> Your Posts </div>

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
    </div>
  );
}