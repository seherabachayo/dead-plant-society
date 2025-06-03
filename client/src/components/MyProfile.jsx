import React from 'react';
import {Text, StyleSheet} from 'react-native-web'; 
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react'; 
import './MyProfile.css'; 
import Post from './Post';
import Comment from './Comment'; 
import PostCard from './PostCard'; 



const ericPost = {
    
}

const ericPF = {
   
}

const ericComment = {
  
}


export default function MyProfile(){
  const [overview, setOverview] = useState(true); 
  const [posts, setPosts] = useState(false); 
  
  const [alreadyDisplayed, setAlreadyDisplayed] = useState(true);
  const [user, setUser] = useState(null);
  const [text, setText] = useState(
    "Welcome to the Dead Plant Society! try not to kill anything"
  );
 

  
  
  useEffect(() => {
  const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // If user is still null (e.g. loading or not logged in), show a placeholder
  if (!user) {
    return <div className="loading-placeholder">Loading profile…</div>;
  }
   
        

 return(
  <div>
  <div className="da-pfp-info">
    <img className='da-user-pfp' src={user.avatar}></img>
    <div className="da-user-info">
        <div className='name-plus-edit'>
            <p className="da-user-name">{user.username}</p>
             <Link to="/edit-profile"><button className='editBtn'>Edit Profile</button></Link>
        </div>
      <p className='da-user-bio'>{ericPF.bio}</p>
      <div className='da-user-stats'>
        
      </div>
      </div>
      
    </div>
    
  <div className='category-buttons'>
        <button className="stat-button" onClick={() => {setOverview(true); setPosts(false); setPlantLogs(false); setComments(false)}}>Overview</button>
        <button className="stat-button" onClick={() => {setPosts(true); setOverview(false); setPlantLogs(false); setComments(false); setAlreadyDisplayed(false)}}>Posts</button>
  </div>
  <div className='maybe-display'>
      {overview ? (

        <div className='overview-display'>
         
          <p>{text}</p>
          
      <button onClick={() => setText("Murderer! Make a post about it to feel better.")}>
        Click me when you kill a plant
      </button>
    </div>
      ) : (
        <></>
      )}
      {posts ? (
        <div className='posts-display'>
          <Post post={ericPost}/>
        </div>
      ) : (
        <></>
      
      )}
      
  </div>
  </div>
 )
}