import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      alert('Please enter a search term.');
      return;
    }

    try {
     
      const response = await fetch(
        `http://localhost:5050/api/post/search?search=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const posts = await response.json();
      if (!Array.isArray(posts) || posts.length === 0) {
        alert('No posts found.');
      } else {
        setResults(posts);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      alert('Failed to fetch search results.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setResults([]);
  };

  return (
    <>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-icon">
          🔍
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
                ✕
            </button>

            <h2>Search Results</h2>
            <div className="results-container">
              {results.map((post) => (
                <div key={post._id} className="result-item">
                  {/* only render image if in post */}
                  {post.image && (
                    <img
                      className="result-image"
                      src={post.image}
                      alt={post.title}
                    />
                  )}
                  <h3 className="result-title">{post.title}</h3>
                  <p className="result-caption">{post.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
