import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import DashBoard from './pages/DashBoard/DashBoard';
import LinkManagment from './components/LinkManagment/LinkManagment';
import Appearance from './components/Appearance/appearance'
import Analytics from './components/Analytics/analytics'

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/links" element={<LinkManagment/>} />
        <Route path="/appearance" element={<Appearance/>} />
        <Route path="/analytics" element={<Analytics/>} />
      </Routes>
    </Router>
  )
}

export default App











