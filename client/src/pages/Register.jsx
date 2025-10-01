import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'


const Register = () => {
     const [email, setEmail] = useState('');
     const[password, setPassword] = useState('');
     const[username,setName] = useState('');
     const navigate = useNavigate(); 


     const handleSubmit = async(e) => {
        e.preventDefault();
       // console.log(email);
            try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, 
          email, 
          password
        }),
      });


      if(response.status === 409){
        alert("User is already created"); 
        return; 
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      

      const data = await response.json();
      console.log('User created:', data);
      // you might redirect or clear the form here
       

      //switch to profile dropdown after successful creation 
      localStorage.setItem("user", JSON.stringify(data.data));
      window.dispatchEvent(new Event("storage"));
      navigate("/");



    } catch (err) {
      console.error('Error creating user:', err);
    }
  };
    
    return (
        <form onSubmit={handleSubmit}>
    <div className="auth-form-container">
      <div className="login-form">
     <h1>Create Your Account </h1>
     <br/><br/>
   
    
    <input
          id="username"
          name="username"
          placeholder="Full Name*"
          value={username}
          onChange={e => setName(e.target.value)}
        />
    <br/><br/>
   
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email*"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br/><br/>
    
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Create an account</button>
    
   </div>
  </div> 
</form>
    )
}
export default Register;