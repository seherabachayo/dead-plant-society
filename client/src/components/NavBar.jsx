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
        <li><Link to="/expanded-post">Expanded Post</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logform">Log Form</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
