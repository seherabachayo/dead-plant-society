import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios"; 

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", pass);
  };

  const handleLogout = () => {
    googleLogout();
    console.log("Logged out");
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <h1>WELCOME TO DEAD PLANT SOCIETY</h1>
        <br />
        <h2>Log In To Begin Your Journey</h2>

        <label htmlFor ="email">Email</label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="johndoe@gmail.com"
          id="login-email"
        />
        <br /><br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="login-password"
        />
        <br /><br />

        <button type="submit">Log In</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>

    
      <p>or</p>

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
        try{
          console.log("Google Credential:", credentialResponse);
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          const response = await fetch("api/users/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
          });
          const data = await response.json();
          console.log("Backend response:", data);
         
         console.log("Sending to Backend:", response.data); 
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
  );
};