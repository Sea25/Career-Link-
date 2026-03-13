import './SkillGap.css';

export default function SkillGap() {
  return (
    <div className="feature-page-container">
      <div className="feature-header">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
        </div>
        <h1>Skill Gap Analyzer</h1>
        <p className="feature-description">
          Analyze your current skills against industry demands. Identify missing skills and get personalized recommendations on what to learn next to land your dream job.
        </p>
      </div>

      <div className="feature-content-placeholder">
        <div className="placeholder-animation">
          <svg className="pulse-circle" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
        </div>
        <h2>Work in Progress</h2>
        <p className="hackathon-notice">Feature will be implemented during hackathon</p>
      </div>
    </div>
  );
}