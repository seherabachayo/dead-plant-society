import React from 'react';
import {Text, StyleSheet} from 'react-native-web'; 
import {useEffect, useState} from 'react'; 
import './Profile.css'; 
import Post from './Post';
import Comment from './Comment'; 
import PostCard from './PostCard'; 

const dummyPosts = [
  {
    name: "Basil",
    causeOfDeath: "Overwatered",
    epitaph: "You were tasty. You were loved.",
    imageUrl: "https://via.placeholder.com/300x200?text=RIP+Basil"
  },
  {
    name: "Cactus",
    causeOfDeath: "Underwatered",
    epitaph: "Deserts miss you.",
    imageUrl: "https://via.placeholder.com/300x200?text=Dead+Cactus"
  },
  {
    name: "Fern",
    causeOfDeath: "Forgotten on vacation",
    epitaph: "Lush no more.",
    imageUrl: "https://via.placeholder.com/300x200?text=Fern+Gone"
  }
];

const ericPost = {
    title: "R.I.P. Bron", 
    description: "R.I.P. to my first plant: Bron. I'll always remember you pal. Bless up!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoxITs0TOUYLJoPLJIVTa3l8b-ltIwemncA&s", 
}

const ericPF = {
    pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s", 
    username: "Eric Ou", 
    bio: "Lebron. Lebron. Lebron.", 
    posts: 107,
    plants: 3, 
    followers: 170,
    following: 1, 
}

const ericComment = {
  profile_pic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddho8dHAH10wgORZ8jw_2gIBRxWNdKtTo5Q&s", 
  name: "Eric Ou", 
  text: "Just got egged by that Eggert final. AAAAAHHHH!", 

}

export default function Profile(){
  const [overview, setOverview] = useState(true); 
  const [posts, setPosts] = useState(false); 
  const [plantLogs, setPlantLogs] = useState(false); 
  const [comments, setComments] = useState(false); 
  const [alreadyDisplayed, setAlreadyDisplayed] = useState(true); 
  const [following, setFollowing] = useState(false); 
  const displayFollow = () => {
    setFollowing(!following); 
  }; 
{/*
  const displayOverview = () => {
    setOverview(overview = true); 
  }; 

  const displayPosts = () => {
    setPosts(!posts); 
  }; 

  const displayPlantLogs = () => {
    setPlantLogs(!plantLogs); 
  }; 

  const displayComments = () => {
    setComments(!comments); 
  }; 
*/}
 return(
  <div>
  <div className="da-pfp-info">
    <img className='da-user-pfp' src={ericPF.pfp}></img>
    <div className="da-user-info">
      <p className="da-user-name">{ericComment.name}</p>
      <p className='da-user-bio'>{ericPF.bio}</p>
      <div className='da-user-stats'>
        <Text className="stats"><Text style={{fontWeight: "bold"}}>{ericPF.posts}</Text> posts</Text>
        <Text className="stats"><Text style={{fontWeight: "bold"}}>{ericPF.plants}</Text> plants</Text>
        <Text className="stats"><Text style={{fontWeight: "bold"}}>{ericPF.followers}</Text> followers</Text>
        <Text className="stats"><Text style={{fontWeight: "bold"}}>{ericPF.following}</Text> following</Text>
      </div>
      </div>
      <button className='followBtn' onClick = {() => displayFollow()}>
        {following ? "Unfollow" : "Follow"}
        </button>

    </div>
  <div className='category-buttons'>
        <button className="stat-button" onClick={() => {setOverview(true); setPosts(false); setPlantLogs(false); setComments(false)}}>Overview</button>
        <button className="stat-button" onClick={() => {setPosts(true); setOverview(false); setPlantLogs(false); setComments(false)}}>Posts</button>
        <button className="stat-button" onClick={() => {setPlantLogs(true); setOverview(false); setPosts(false); setComments(false)}}>Plant Logs</button>
        <button className="stat-button" onClick={() => {setComments(true); setOverview(false); setPosts(false); setPlantLogs(false)}}>Comments</button>
  </div>
  <div className='maybe-display'>
      {overview ? (

        <div className='overview-display'>
          <Post post={ericPost}/>
          <Comment values={ericComment}/>
          {dummyPosts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
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
      {plantLogs ? (
        <div className='plant-logs-display'>
          {dummyPosts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {comments ? (
        <div className='comments-display'>
          <Comment values={ericComment}/>
        </div>
      ) : (
        <></>
      )}
  </div>
  </div>
 )
}