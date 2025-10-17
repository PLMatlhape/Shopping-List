import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './Components/Pages/Navigation-Bar/NavBar'
import Home from './Components/Pages/Home-Page/Home'
import LoginRegister from './Components/Login-Register/LoginRegister'
import './App.css'


// Component to conditionally render NavBar
const AppContent = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className='app-container'>
      <Router>
        <AppContent />
      </Router>
    </div>
  )
}

export default App
