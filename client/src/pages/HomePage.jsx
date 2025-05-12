import React from 'react';
import PostCard from '../components/PostCard';
import Comment from '../components/Comment'; 
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

const redditPost = {
  name: "Eric Ou",
  causeOfDeath: "ABGs",
  epitaph: "Couldn't Seaside no more.",
  imageUrl: "https://via.placeholder.com/300x200?text=Fern+Gone"
}

const HomePage = () => {
  return (
    <div className="home">
      <h2>Recent Tributes</h2>
      <div className="scroll-container">
        {dummyPosts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
        
      </div>
    </div>
  );
};

export default HomePage;
