import React, { useState } from "react"

export const Login = ({onFormSwitch}) => {
    const [email, setEmail] = useState('');
    const[pass, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
    <div className="auth-form-container">
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
          <button>Log In</button>
        <p>
           Don't have an account? 
           <button type="button" onClick={() => onFormSwitch('register')} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
          Register here
        </button>
      </p>
       </form>
      

       </div>
    )
}
//to make this a link, need to add react router DOM, for now making it 
       //a  button so page does not reload FIX LATER 