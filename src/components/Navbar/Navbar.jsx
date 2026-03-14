import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/authService';
import './Navbar.css';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo" onClick={closeMenu}>
          CareerLink
        </Link>
        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/skill-gap"
              className={location.pathname === '/skill-gap' ? 'active' : ''}
              onClick={closeMenu}
            >
              Skill Gap
            </Link>
          </li>
          <li>
            <Link 
              to="/resume-analyzer"
              className={location.pathname === '/resume-analyzer' ? 'active' : ''}
              onClick={closeMenu}
            >
              Resume Analyzer
            </Link>
          </li>
          <li>
            <Link 
              to="/career-path"
              className={location.pathname === '/career-path' ? 'active' : ''}
              onClick={closeMenu}
            >
              Career Path
            </Link>
          </li>
          
          <div className="navbar-user-mobile">
            {user && <span className="user-greeting">Hi, {user.displayName || user.email?.split('@')[0]}</span>}
            <button onClick={() => { handleLogout(); closeMenu(); }} className="logout-btn">Logout</button>
          </div>
        </ul>
        <div className="navbar-user">
          {user && <span className="user-greeting">Hi, {user.displayName || user.email?.split('@')[0]}</span>}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
}
