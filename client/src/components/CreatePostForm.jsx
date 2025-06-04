import React, { useState, useEffect, useRef } from 'react';
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
  const [imageType, setImageType] = useState('url'); // 'url' or 'file'
  const fileInputRef = useRef(null);
    

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          const maxDimension = 800;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get compressed image as base64 string
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      const compressedBase64 = await compressImage(file);
      setFormData(prev => ({
        ...prev,
        image: compressedBase64
      }));
      setError(null);
    } catch (err) {
      setError('Error processing image');
      console.error('Error processing image:', err);
    }
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
      poster: user._id,
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
      setImageType('url');
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
              <label>Image:</label>
              <div className="image-input-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${imageType === 'url' ? 'active' : ''}`}
                  onClick={() => setImageType('url')}
                >
                  URL
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${imageType === 'file' ? 'active' : ''}`}
                  onClick={() => setImageType('file')}
                >
                  Upload
                </button>
              </div>
              {imageType === 'url' ? (
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              ) : (
                <div className="file-input-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="file-select-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Choose File
                  </button>
                  {formData.image && imageType === 'file' && (
                    <span className="file-selected">Image selected</span>
                  )}
                </div>
              )}
            </div>
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
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