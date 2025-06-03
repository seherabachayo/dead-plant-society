import React, { useState, useEffect } from 'react';
import './CreatePostForm.css';

export default function CreatePostForm() {
  const [postType, setPostType] = useState('post'); // 'post' or 'obituary'
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    image: '',
    poster: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
    

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg('');
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('Please log in to create a post');
      setLoading(false);
      return;
    }

    let payload = {
      title: formData.title,
      caption: formData.caption,
      image: formData.image,
      username: user.username,
      poster:user._id,
      avatar: user.avatar,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:5050/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      setSuccessMsg('Post created successfully');
      setFormData({
        title: '',
        caption: '',
        image: '',
        poster: '',
      });
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-form">
      <div className="post-type-toggle">
        <button
          className={postType === 'post' ? 'active' : ''}
          onClick={() => setPostType('post')}
          type="button"
        >
          POST
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Cause of Death:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {postType === 'post' ? (
          <>
            <div className="form-field">
              <label>Caption:</label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-field">
              <label>Caption:</label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Posting…' : 'Post'}
        </button>

        {error && <p className="error-text">Error: {error}</p>}
        {successMsg && (
          <p className="success-text">{successMsg}</p>
        )}
      </form>
    </div>
  );
}