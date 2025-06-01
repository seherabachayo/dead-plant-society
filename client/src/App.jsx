import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ExpandedPost from './pages/ExpandedPost'
import LogForm from './components/LogForm';
import Post from './components/Post'
//import post_pic from "/Users/kaibacker/Downloads/IMG_0440.jpg"

import CreateUser from './pages/Register';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar /> 
      
      <CreateUser />

     <div className="App">
        <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
          <Route path="/logform" element={<LogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expanded-post" element={<ExpandedPost post={fake_post}/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}
const fake_post={
    title:"Insert Post title",
    description: "This is the description",
    image: "https://veryplants.com/cdn/shop/articles/Exotic-succulent-plants.jpg?v=1706711966"
}

// export default App
