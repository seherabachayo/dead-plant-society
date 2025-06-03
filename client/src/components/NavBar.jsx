import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {useEffect, useState} from 'react'; 
import './NavBar.css';
import logo from '../assets/logo.png';

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(() => {
        const user = localStorage.getItem("user");
        return !!user;
      });

    useEffect(() => {
 const updateLoggedInStatus = () => {
     const user = localStorage.getItem("user");
     setLoggedIn(!!user);
}; 

 updateLoggedInStatus();

 window.addEventListener("storage", updateLoggedInStatus);

 return () => {
     window.removeEventListener("storage", updateLoggedInStatus);
 };
}, []);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="logo">
                    <img src={logo} alt="Dead Plant Society Logo" className="nav-logo" />
                </Link>
            </div>
            
            <div className="nav-center">
                <SearchBar />
            </div>
            
            { loggedIn ? (<div className="nav-right">
                
                <Link to="/create" className="nav-button">
                    + POST
                </Link>
                <Link to="/diaries" className="nav-button">
                    PLANT DIARIES
                </Link>
            <li className="dropdown">
                <Link to="/my-profile" className="dropbtn"><img className='da-pfp' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s"></img>
                </Link>
                    <ul className='dropdown-content'>
                    <div className='da-box'>
                        <li>
                            <Link to="/">
                            <button className="da-box-content"
                            onClick={() => {
                                localStorage.removeItem("user");
                                setLoggedIn(false);
                                window.dispatchEvent(new Event("storage")); 
                            }}
                            >
                            
                                Sign Out</button></Link>
                        </li>
                        <li>
                            <Link to="/my-activity">
                            <button className="da-box-content">
                                My Activity</button></Link>
                        </li>
                        <li>
                            <Link to="/my-profile">
                            <button className="da-box-content">
                                Edit Profile</button></Link>
                        </li>
                    </div>
                    </ul>
                </li>

            </div>) : (<div className='freaky-right'>
                <Link to="/register" className="nav-button">
                                Register
                </Link>
                <Link to="/login" className="nav-button">
                                Log In
                </Link>
            </div>)}
        </nav>
    );
}