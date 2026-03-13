import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      description: 'Analyze your skills against market demands and find areas to improve.',
      path: '/skill-gap-analyzer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
      )
    },
    {
      id: 'resume-analyzer',
      title: 'Resume Analyzer',
      description: 'Get AI-powered feedback on your resume to stand out to employers.',
      path: '/resume-analyzer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      )
    },
    {
      id: 'career-path',
      title: 'Career Path',
      description: 'Discover tailored career paths and roadmaps based on your profile.',
      path: '/career-path',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      )
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-banner">
        <div className="banner-content">
          <h1>Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!</h1>
          <p>Always stay updated with your career development progress.</p>
        </div>
        <div className="banner-image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Career Tools</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="feature-card"
              onClick={() => navigate(feature.path)}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <div className="feature-info">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-action">
                  <span>Explore tool</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}