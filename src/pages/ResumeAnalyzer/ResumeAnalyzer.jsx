import './ResumeAnalyzer.css';

export default function ResumeAnalyzer() {
  return (
    <div className="feature-page-container">
      <div className="feature-header">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <h1>Resume Analyzer</h1>
        <p className="feature-description">
          Upload your resume and get immediate, AI-powered feedback on its structure, content, and relevance to the job market. Make your resume stand out to employers.
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
