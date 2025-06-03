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
    const [poster, setPoster] = useState({});   
    
    useEffect(() => {
        const updateLoggedInStatus = () => {
            const user = localStorage.getItem("user");
            setLoggedIn(!!user);
        }; 

 updateLoggedInStatus();

 window.addEventListener("storage", updateLoggedInStatus);
 
 const user = JSON.parse(localStorage.getItem("user")); 
    if(user){    
        fetch(
              `http://localhost:5050/api/users/${user._id}` //fetches poster with same id as in url
          ).then(res => {
              if(!res.ok) throw new Error(res.statusText);
              return res.json(); 
          })
          .then(
              data=>{
                  if(data.success && data.data){
                      setPoster(data.data); 
                  }
                  else{
                  throw new Error('Invalid format');
                  }
              })
              .catch(err => {
              setError(err.message);
          })
        .finally(() => {
         // setLoading(false);
        })};
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
                <Link to="/my-profile" className="dropbtn"><img className='da-pfp' src={JSON.parse(localStorage.getItem("user"))?.avatar} alt="https://bruinwalk-assets.sfo3.cdn.digitaloceanspaces.com/media/images/professors/Paul_R_Eggert_Yi5vPr5.jpg"></img>
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