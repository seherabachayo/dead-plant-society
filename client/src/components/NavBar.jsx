import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>🪴 Dead Plant Society</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">New Post</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
