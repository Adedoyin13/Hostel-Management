import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-confirm-alert/src/react-confirm-alert.css";
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
