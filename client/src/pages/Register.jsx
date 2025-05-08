import React, { useState } from "react"

export const Register = () => {
     const [email, setEmail] = useState('');
     const[pass, setPassword] = useState('');
     const[name,setName] = useState('');

     const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <form>
    <div className="auth-form-container">
     <h1>Create Your Account </h1>
    <label htmlFor="name">Full Name</label>
    <br />
    <input value={name} name="name" placeholder="John Doe" id="email" />
    <br />
    <br />
    <label htmlFor="email">Email</label>
    <br />
    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" id="email" />  
    <br />
    <br />
    <label htmlFor="password">Password</label>
    <br />
    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" />
    <br />
    <br />
    <button>Create an account</button>
    
   
  </div> 
</form>
    )
}
