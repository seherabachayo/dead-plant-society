import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !pass) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5050/api/users/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password:pass}), 
      }); 
    
      const data = await response.json(); 

      if(response.ok && data.success){
        localStorage.setItem("user", JSON.stringify(data.data))
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch(err) {
      alert("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    googleLogout();
    console.log("Logged out");
  };

  return (
    <div className="auth-form-container">
      <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>WELCOME TO DEAD PLANT SOCIETY</h1>
        <br />
        <h2>Log In To Begin Your Journey</h2>

        <div className="google-login">
        <GoogleLogin
        onSuccess={async (credentialResponse) => {
        try{
          const response = await fetch("http://localhost:5050/api/users/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
          });
          const data = await response.json();
          
          if (response.ok && data.success) {
            localStorage.setItem("user", JSON.stringify(data.data));
            window.dispatchEvent(new Event("storage")); 
            navigate("/");
          } else {
            alert(data.message || "Google login failed");
          }
        }
         catch(err){
           alert("Failed to authenticate with Google. Please try again."); 
         }
        }}
        onError={() => {
          alert("Google login failed. Please try again or use email login.");
        }}
        auto_select={true}
       />
       </div>
      
      <div className="divider"><span>OR</span></div>

      {/* non Google login  */}
      <div className="reg-login">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email *"
          id="login-email"
          disabled={loading}
        />
        <br /><br />

        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password *"
          id="login-password"
          disabled={loading}
        />
        <br /><br />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
     </div>
     </div>
  );
};

export default Login;
