import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LogForm from './components/LogForm.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

//put in .env? later
const CLIENT_ID = "581003784480-vkkr9j51r6bv1il8t28nc2t5plesv431.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={CLIENT_ID}>
       <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
