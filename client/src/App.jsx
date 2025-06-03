import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CreatePostForm from './components/CreatePostForm';
import { PostProvider } from './context/PostContext';
import LogForm from './pages/LogForm';
import Profile from './components/Profile'; 
import MyProfile from "./components/MyProfile";
import EditProfile from "./components/EditProfile";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import ExpandPost from "./pages/ExpandedPost";


export default function App() {
    return (
        <PostProvider>
            <Router>
                <div className="app">
                    <NavBar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={<CreatePostForm />} />
                            <Route path="/diaries" element={<LogForm />} />
                            <Route path="/post/:id" element={<ExpandPost />} />
                            <Route path="*" element={<div>404 - Page Not Found</div>} />
                            <Route path="/my-activity" element={<Profile/>}></Route>
                            <Route path="/my-profile" element={<MyProfile/>}></Route>
                            <Route path="/edit-profile" element={<EditProfile/>}></Route>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/register" element={<Register/>}></Route>
                        </Routes>
                    </main>
                </div>
            </Router>
        </PostProvider>
    );
}
