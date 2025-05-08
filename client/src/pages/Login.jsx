import React, { useState } from "react"
import { Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const[pass, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}></form>
       <form>
        <h1>WELCOME TO DEAD PLANT SOCIETY</h1>
        <br />
        <br />
           <h2>Log In To Begin Your Journey</h2>
       <label htmlFor="email">Email</label>
       <br />
       <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" id="email" />  
       <br />
       <br />
          <label for="password">Password</label>
          <br />
          <input type="password" placeholder="password" id="password" name = "email" />
          <br />
          <br />
          <button type="submit">Log In</button>
        <p>
           Don't have an account? 
           <Link to="/register">Register here</Link>
      </p>
       </form>
      

       </div>
    )
}
//to make this a link, need to add react router DOM, for now making it 
       //a  button so page does not reload FIX LATER 
