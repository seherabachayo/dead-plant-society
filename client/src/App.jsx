import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ExpandPost from './pages/ExpandedPost'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Router>
      <NavBar /> 
     <div className="App">
        <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/create" element={<div>Create Page</div>} />
         <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expandedpost" element={<ExpandPost/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App
