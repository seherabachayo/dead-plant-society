import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ExpandedPost from './pages/ExpandedPost'
import LogForm from './components/LogForm';

//import CreateUser from './pages/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar /> 
      
      {/*<CreateUser />*/}

     <div className="App">
        <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expandedpost" element={<ExpandedPost/>}/>
          <Route path="/LogForm" element={<LogForm/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}
export default App
