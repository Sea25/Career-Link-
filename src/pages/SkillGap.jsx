import React, { useState } from 'react';
import { jobRoles } from '../data/roles.js';
import { 
  getRequiredSkills, 
  getMatchedSkills, 
  getMissingSkills, 
  calculateMatchPercentage 
} from '../utils/skillMatcher.js';
import { generateRoadmap } from '../utils/roadmapGenerator.js';
import './SkillGap.css';

const SkillGap = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentSkillsInput, setCurrentSkillsInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    if (!selectedRole) {
      alert('Please select a job role first.');
      return;
    }

    const requiredSkills = getRequiredSkills(selectedRole);
    const matchedSkills = getMatchedSkills(currentSkillsInput, requiredSkills);
    const missingSkills = getMissingSkills(currentSkillsInput, requiredSkills);
    const matchPercentage = calculateMatchPercentage(matchedSkills.length, requiredSkills.length);
    const roadmap = generateRoadmap(missingSkills);

    setAnalysisResult({
      requiredSkills,
      matchedSkills,
      missingSkills,
      matchPercentage,
      roadmap
    });
  };

  return (
    <div className="skill-gap-container">
      <header className="skill-gap-header">
        <h1>Skill Gap Analyzer</h1>
        <p>Compare your current skills with industry requirements and get a personalized learning roadmap.</p>
      </header>

      <section className="skill-input-section">
        <div className="input-group">
          <label htmlFor="role-select">Target Job Role</label>
          <select 
            id="role-select" 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">-- Select a Role --</option>
            {Object.keys(jobRoles).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="skills-input">Your Current Skills (comma-separated)</label>
          <input 
            type="text" 
            id="skills-input" 
            placeholder="e.g. HTML, CSS, JavaScript" 
            value={currentSkillsInput}
            onChange={(e) => setCurrentSkillsInput(e.target.value)}
          />
        </div>

        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Skills
        </button>
      </section>

      {analysisResult && (
        <section className="results-section">
          <div className="match-score-card">
            <h2>Match Score</h2>
            <div className="score-circle">
              <span>{analysisResult.matchPercentage}%</span>
            </div>
          </div>

          <div className="skills-breakdown">
            <div className="skill-list-card required-card">
              <h3>Required Skills</h3>
              <ul>
                {analysisResult.requiredSkills.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="skill-list-card matched-card">
              <h3>Matched Skills</h3>
              <ul>
                {analysisResult.matchedSkills.length > 0 
                  ? analysisResult.matchedSkills.map(skill => <li key={skill}>✅ {skill}</li>)
                  : <li>None matched</li>}
              </ul>
            </div>
            <div className="skill-list-card missing-card">
              <h3>Missing Skills</h3>
              <ul>
                {analysisResult.missingSkills.length > 0 
                  ? analysisResult.missingSkills.map(skill => <li key={skill}>❌ {skill}</li>)
                  : <li>No missing skills! You're ready!</li>}
              </ul>
            </div>
          </div>

          {analysisResult.roadmap.length > 0 && (
            <div className="roadmap-section">
              <h2>Your Learning Roadmap</h2>
              <div className="roadmap-timeline">
                {analysisResult.roadmap.map((step) => (
                  <div className="roadmap-card" key={step.skillName}>
                    <div className="step-badge">Step {step.stepNumber}</div>
                    <div className="step-content">
                      <h3>{step.skillName}</h3>
                      <p>{step.instruction}</p>
                      <div className="resource-links">
                        <a href={step.youtubeLink} target="_blank" rel="noopener noreferrer" className="resource-link youtube-link">
                          📺 Watch Tutorial
                        </a>
                        <a href={step.websiteLink} target="_blank" rel="noopener noreferrer" className="resource-link website-link">
                          🌐 Read Guide
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default SkillGap;
