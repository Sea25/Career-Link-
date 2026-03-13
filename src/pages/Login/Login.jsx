import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-illustration">
          <h1>Welcome Back to CareerLink</h1>
          <p>Login to track your career path, build your resume, and find your skill gaps.</p>
          <div className="illustration-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
          </div>
        </div>
        <div className="auth-form-container">
          <h2>Student Login</h2>
          <p className="auth-subtitle">Please enter your details to sign in</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button className="auth-submit-btn" disabled={loading} type="submit">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="social-login">
              <p>Or Sign in with</p>
              <div className="social-buttons">
                <button type="button" className="social-btn" onClick={() => navigate('/dashboard')}>Google</button>
                <button type="button" className="social-btn" onClick={() => navigate('/dashboard')}>Facebook</button>
              </div>
            </div>
          </form>
          
          <p className="auth-redirect">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}