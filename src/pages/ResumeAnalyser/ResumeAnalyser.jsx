import { useNavigate } from 'react-router-dom';
import './SkillGap.css';

export default function SkillGap() {
  const navigate = useNavigate();

  return (
    <div className="feature-page">
      <nav className="feature-nav">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h2>Skill Gap Analyzer</h2>
        <div></div>
      </nav>

      <div className="feature-container">
        <div className="coming-soon-content">
          <h3>🚧 Under Construction 🚧</h3>
          <p>This feature will be built during the hackathon!</p>
          <div className="preview-box">
            <h4>What's coming:</p>
            <ul>
              <li>Skill matching algorithm</li>
              <li>Career readiness score</li>
              <li>Personalized learning roadmap</li>
              <li>Database integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}