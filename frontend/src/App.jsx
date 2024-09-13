import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage/LandingPage'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import DashBoard from './pages/DashBoard/DashBoard';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
    </Router>
  )
}

export default App











