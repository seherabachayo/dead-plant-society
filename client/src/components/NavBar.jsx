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
        <li><Link to="/expandedpost">Expanded Post</Link></li>
        <li><Link to="/logform">Log Form</Link></li>
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
      </ul>
    </nav>
  );
};

export default NavBar;