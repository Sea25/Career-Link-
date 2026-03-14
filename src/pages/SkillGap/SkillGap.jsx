import { useState } from 'react';
import './SkillGap.css';

const JOB_CATEGORIES = {
  "Technology": {
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive Design"],
    "Backend Developer": ["Node.js", "Python", "Java", "SQL", "REST APIs", "Git"],
    "Full Stack Developer": ["HTML", "CSS", "JavaScript", "Node.js", "SQL", "React", "Git"],
    "Data Scientist": ["Python", "R", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
    "AI Engineer": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Mathematics"],
    "Cybersecurity Analyst": ["Network Security", "Linux", "Python", "Risk Assessment", "Cryptography"],
    "Cloud Engineer": ["AWS", "Azure", "Linux", "Networking", "Docker", "Kubernetes"]
  },
  "Business": {
    "Business Analyst": ["Data Analysis", "SQL", "Excel", "Communication", "Requirements Gathering"],
    "Product Manager": ["Agile", "Roadmapping", "Communication", "Market Research", "Leadership"],
    "Digital Marketing Specialist": ["SEO", "SEM", "Content Marketing", "Analytics", "Social Media"],
    "Financial Analyst": ["Excel", "Financial Modeling", "Accounting", "Data Analysis", "Forecasting"],
    "Accountant": ["Accounting", "Excel", "Tax Preparation", "Financial Reporting", "QuickBooks"]
  },
  "Creative": {
    "Graphic Designer": ["Adobe Illustrator", "Photoshop", "Typography", "Branding", "Creativity"],
    "UI/UX Designer": ["Figma", "Wireframing", "Prototyping", "User Research", "Usability Testing"],
    "Video Editor": ["Premiere Pro", "After Effects", "Color Grading", "Storytelling", "Audio Editing"],
    "Content Creator": ["Copywriting", "Video Editing", "Social Media", "Storytelling", "Creativity"]
  },
  "Engineering": {
    "Mechanical Engineer": ["AutoCAD", "SolidWorks", "Thermodynamics", "Fluid Mechanics", "Problem Solving"],
    "Civil Engineer": ["AutoCAD", "Structural Analysis", "Project Management", "Surveying", "Materials Science"],
    "Electrical Engineer": ["Circuit Design", "MATLAB", "C++", "PCB Design", "Power Systems"]
  },
  "Professional Careers": {
    "Teacher": ["Lesson Planning", "Communication", "Patience", "Classroom Management", "Empathy"],
    "Doctor": ["Medical Knowledge", "Patient Care", "Anatomy", "Diagnostics", "Empathy", "Problem Solving"],
    "Lawyer": ["Legal Research", "Writing", "Negotiation", "Critical Thinking", "Public Speaking"],
    "Entrepreneur": ["Leadership", "Sales", "Marketing", "Financial Management", "Risk Taking"]
  }
};

const getRequiredSkills = (selectedRole) => {
  for (const category in JOB_CATEGORIES) {
    if (JOB_CATEGORIES[category][selectedRole]) {
      return JOB_CATEGORIES[category][selectedRole];
    }
  }
  return [];
};

export default function SkillGap() {
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [currentSkillsInput, setCurrentSkillsInput] = useState("");
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    const requiredSkills = getRequiredSkills(targetRole);
    
    // Parse user input into an array of trimmed, non-empty, lowercase strings for comparison
    const userSkillsArray = currentSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const userSkillsLower = userSkillsArray.map(s => s.toLowerCase());

    const missingSkills = requiredSkills.filter(
      skill => !userSkillsLower.includes(skill.toLowerCase())
    );

    setResults({
      requiredSkills,
      userSkills: userSkillsArray.length > 0 ? userSkillsArray : ["None"],
      missingSkills
    });
  };

  return (
    <div className="feature-page-container">
      <div className="feature-header">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </div>
        <h1>Skill Gap Analyzer</h1>
        <p className="feature-description">
          Analyze your current skills against industry demands. Identify missing skills and get personalized recommendations on what to learn next to land your dream job.
        </p>
      </div>

      <div className="analyzer-card">
        <div className="input-group">
          <label htmlFor="role-select">Target Job Role</label>
          <select 
            id="role-select" 
            value={targetRole} 
            onChange={(e) => setTargetRole(e.target.value)}
          >
            {Object.entries(JOB_CATEGORIES).map(([category, roles]) => (
              <optgroup key={category} label={category}>
                {Object.keys(roles).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="skills-input">Your Current Skills</label>
          <input 
            type="text" 
            id="skills-input" 
            placeholder="Example: HTML, CSS, JavaScript, Communication, Excel, Creativity"
            value={currentSkillsInput}
            onChange={(e) => setCurrentSkillsInput(e.target.value)}
          />
        </div>

        <button className="analyze-button" onClick={handleAnalyze}>
          Analyze Skills
        </button>

        {results && (
          <div className="result-section">
            <h3>Analysis Results</h3>
            
            <div className="result-item">
              <h4>Required Skills</h4>
              <div className="skill-tags">
                {results.requiredSkills.map(skill => (
                  <span key={skill} className="skill-tag required">{skill}</span>
                ))}
              </div>
            </div>

            <div className="result-item">
              <h4>Your Skills</h4>
              <div className="skill-tags">
                {results.userSkills.map(skill => (
                  <span key={skill} className="skill-tag yours">{skill}</span>
                ))}
              </div>
            </div>

            <div className="result-item">
              <h4>Missing Skills</h4>
              <div className="skill-tags">
                {results.missingSkills.length > 0 ? (
                  results.missingSkills.map(skill => (
                    <span key={skill} className="skill-tag missing">{skill}</span>
                  ))
                ) : (
                  <span className="empty-state">You have all the required skills! 🎉</span>
                )}
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}