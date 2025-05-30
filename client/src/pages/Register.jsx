import React, { useState, useEffect } from "react"

//maddieCode
const CreateUser = () => {
  useEffect(() => {
    const createUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": 'Seher',
            "password": 'j123',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User created:', data);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    createUser();
  }, []);

  return null; // No UI needed
};

export default CreateUser;





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
    <input value={name} onChange={(e)=>setName(e.target.value)} name="name" placeholder="John Doe" id="email" />
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
