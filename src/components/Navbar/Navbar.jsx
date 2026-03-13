import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
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
              to="/skill-gap-analyzer"
              className={location.pathname === '/skill-gap-analyzer' ? 'active' : ''}
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
          {user && <span className="user-greeting">Hi, {user.displayName || user.email.split('@')[0]}</span>}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
}
