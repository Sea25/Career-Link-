import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/authService';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          CareerLink
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/skill-gap"
              className={location.pathname === '/skill-gap' ? 'active' : ''}
            >
              Skill Gap
            </Link>
          </li>
          <li>
            <Link 
              to="/resume-analyzer"
              className={location.pathname === '/resume-analyzer' ? 'active' : ''}
            >
              Resume Analyzer
            </Link>
          </li>
          <li>
            <Link 
              to="/career-path"
              className={location.pathname === '/career-path' ? 'active' : ''}
            >
              Career Path
            </Link>
          </li>
        </ul>
        <div className="navbar-user">
          {user && <span className="user-greeting">Hi, {user.displayName || user.email?.split('@')[0]}</span>}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
}
