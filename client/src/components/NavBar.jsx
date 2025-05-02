import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🪴 Dead Plant Society</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/create">New Post</a></li>
        <li><a href="/leaderboard">Leaderboard</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
