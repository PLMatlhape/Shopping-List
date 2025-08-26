import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Components/Pages/Navigation-Bar/NavBar'
import Home from './Components/Pages/Home-Page/Home'
import LoginRegister from './Components/Login-Register/LoginRegister'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <NavBar />
              <Home />
            </>
          } />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/signup" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App