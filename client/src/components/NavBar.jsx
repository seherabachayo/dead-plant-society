import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo">
                    LOGO
                </Link>
            </div>
            
            <div className="nav-center">
                <SearchBar />
            </div>
            
            <div className="nav-right">
                <Link to="/create" className="nav-button">
                    + POST
                </Link>
                <Link to="/diaries" className="nav-button">
                    PLANT DIARIES
                </Link>
                <div className="user-avatar"></div>
            </div>
        </nav>
    );
}