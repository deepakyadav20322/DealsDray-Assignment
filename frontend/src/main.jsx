import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider  from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Navbar/>
    <App />
    <ToastContainer/>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
