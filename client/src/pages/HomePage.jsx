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
    <div className="home-layout">
      <div className="home">
        <h2>Recent Tributes</h2>
        <div className="scroll-container">
          {dummyPosts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>

{/* dummy leaderboard on home page, not sure if I should create a seperate page for it, wait for backend */}
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <br />
        <h3>Top Plant Deaths</h3>
        <ul className="leaderboard-list">
          <li>1.  Basil</li>
          <li>2. Cactus</li>
          <li>3. Succulent</li>
          <li>4. Aloe Vera</li>
        </ul>
      </div>
    </div> 
  );
};

export default HomePage;
