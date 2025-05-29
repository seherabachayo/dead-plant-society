import React, { useState, useEffect } from "react"


export const Register = () => {
     const [email, setEmail] = useState('');
     const[password, setPassword] = useState('');
     const[username,setName] = useState('');

     const handleSubmit = async(e) => {
        e.preventDefault();
       // console.log(email);
            try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, 
          email, 
          password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User created:', data);
      // you might redirect or clear the form here
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };
    
    return (
        <form onSubmit={handleSubmit}>
    <div className="auth-form-container">
     <h1>Create Your Account </h1>
    <label htmlFor="username">Full Name</label>
    <input
          id="username"
          name="username"
          placeholder="testperson"
          value={username}
          onChange={e => setName(e.target.value)}
        />
    <br />
    <br />
    <label htmlFor="email">Email</label><br/>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br/><br/>
    <label htmlFor="password">Password</label><br/>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Create an account</button>
    
   
  </div> 
</form>
    )
}
export default Register;