import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import SearchBar from './SearchBar';



const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Header/title link (not inside <ul>) */}
      <div className="navbar-title">
        <Link to="/"><h2>🪴 Dead Plant Society</h2></Link>
      </div>
       <div className="navbar-search"> 
          <SearchBar />
       </div>
       <link rel="stylesheet" href="./NavBar.css"></link>
    
      <ul className="navbar-links">
        {/* <li><Link to="/">Home</Link></li> */}
        {/* Will fix later, want to show  Create a Post upon hovering but built in react button not allowing this  */}
        <li> <span title="Create a Post">
             <Link to="/create"><button>+ Create</button></Link>
             </span>
        </li>
        <li><Link to="/expanded-post">Expanded Post</Link></li>
        <li><Link to="/logform">Log Form</Link></li>
        <li className="dropdown">
          <Link to="#" className="dropbtn">Profile ▾</Link>
          <ul className="dropdown-content">
            <li><Link to="/login">Login</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;