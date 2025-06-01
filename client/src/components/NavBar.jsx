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
                <li className="dropdown">
          {/*Will replace Eric Ou pfp with currentUser.pfp; we need to make a getCurrentUser function though*/}
          <Link to="/my-profile" className="dropbtn"><img className="da-pfp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s"></img></Link>
          
            <ul className="dropdown-content">
              <div className='da-box'>
              <li><Link to="/login"><button className='da-box-content'>Sign Out</button></Link></li>
              <li><Link to="/my-activity"><button className='da-box-content'>My Activity</button></Link></li>
              <li><Link to="/edit-profile"><button className='da-box-content'>Edit Profile</button></Link></li>
              </div>
            </ul>
        </li>
                {/*<div className="user-avatar"></div>*/}
            </div>
        </nav>
    );
}
