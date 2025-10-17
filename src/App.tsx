
import './App.css'


// Component to conditionally render NavBar
const AppContent = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login' || location.pathname === '/dashboard' || location.pathname === '/profile';

  return (
  )
}

export default App