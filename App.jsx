import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './Login.jsx'
import Register from './Register.jsx'

function App() {
const [token, setToken] = useState(localStorage.getItem("AppToken") || "");
    const [showLogin, setShowLogin] = useState(true);


    function handleLoginSuccess(newToken) {
        localStorage.setItem("AppToken", newToken);
        setToken(newToken);
    }

    function handleLogout() {
        localStorage.removeItem("AppToken");
        setToken("");
    }

  if (!token) {
      if (showLogin) {
          return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowLogin(false)} />
      } else {
          return <Register onSwitchToLogin={() => setShowLogin(true)} />
      }
  }

  return (
    <>
      <h1> App Name </h1>

    </>
  )
}

export default App
