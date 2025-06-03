import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import './Login.css'; 


import axios from "axios"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", pass);
    
    try{
      const response = await fetch("http://localhost:5050/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, password:pass}), 
    }); 
    
    const data = await response.json(); 
    console.log("Login:", data);

    if(response.ok && data.success){
      localStorage.setItem("user", JSON.stringify(data.data))
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
    else{
      alert(data.message || "Login failed");
    }
  }
  catch(err){
    console.error("Login failure:", err); 
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
          console.log("Google Credential:", credentialResponse);
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          const response = await fetch("http://localhost:5050/api/users/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
          });
          const data = await response.json();
          console.log("Backend response:", data);
         
         console.log("Sending to Backend:", response.data); 
         localStorage.setItem("user", JSON.stringify(data.data));
         window.dispatchEvent(new Event("storage")); 
          
         navigate("/");
        }
         catch(err){
           console.error("Google login failed", err); 
         }
        }}
        onError={() => console.log("Login failed")}
        auto_select={true}
       />
       </div>
      
      <div className="divider"><span>OR</span></div>

      {/* non Google login  */}
      <div className="reg-login">
        <label htmlFor ="email">Email</label>
     
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email *"
          id="login-email"
        />
        <br /><br />

        <label htmlFor="password">Password</label>
     
        <input
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password *"
          id="login-password"
        />
        <br /><br />
        </div>
        <button type="submit">Log In</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
     </div>
     </div>

      );
   
};
export default Login;
