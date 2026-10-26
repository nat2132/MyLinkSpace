import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/SignIn/Login'
import Register from './pages/SignUp/Register'
import DashBoard from './pages/DashBoard/DashBoard';
import LinkManagment from './components/LinkManagment/linkmanagment';
import Appearance from './components/Appearance/appearance'
import Analytics from './components/Analytics'

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/links" element={<LinkManagment/>} />
        <Route path="/appearance" element={<Appearance/>} />
        <Route path="/analytics" element={<Analytics/>} />
      </Routes>
    </Router>
  )
}

export default App











