import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
//import NavBar from './components/NavBar.jsx'
//import HomePage from './pages/HomePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      Hello World
    </div>
    <App />
  </StrictMode>,
)
