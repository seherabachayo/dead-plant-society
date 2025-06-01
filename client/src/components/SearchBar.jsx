import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log('Searching for:', searchTerm);
    };

    return (
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
    );
}