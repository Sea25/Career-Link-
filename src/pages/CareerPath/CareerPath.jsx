import { useState } from 'react';
import './CareerPath.css';

const careerData = {
  BTech: [
    {
      branch: 'CSE (Computer Science)',
      skills: ['Data Structures', 'Web Development', 'DBMS', 'OOP'],
      jobs: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Data Analyst'],
      companies: ['TCS', 'Infosys', 'Google', 'Startups']
    },
    {
      branch: 'IT (Info Technology)',
      skills: ['Networking', 'Cloud Computing', 'Web Dev', 'Security'],
      jobs: ['Sys Admin', 'Network Engineer', 'Cloud Architect', 'Security Analyst'],
      companies: ['Wipro', 'Cognizant', 'AWS', 'Microsoft']
    },
    {
      branch: 'ECE (Electronics)',
      skills: ['Circuit Design', 'IoT', 'Embedded Systems', 'Signals'],
      jobs: ['Hardware Eng', 'Network Eng', 'Telecom Eng'],
      companies: ['Intel', 'Samsung', 'Cisco', 'Qualcomm']
    },
    {
      branch: 'EEE (Electrical)',
      skills: ['Power Systems', 'Controls', 'Renewable Energy', 'Machines'],
      jobs: ['Electrical Eng', 'Power Plt Eng', 'Energy Consultant'],
      companies: ['L&T', 'Siemens', 'BHEL', 'ABB']
    }
  ],
  BSc: [
    {
      branch: 'Computer Science',
      skills: ['Programming', 'Maths', 'Algorithms', 'Databases'],
      jobs: ['Developer', 'System Analyst', 'Testing Eng'],
      companies: ['Wipro', 'Cognizant', 'Tech Mahindra']
    },
    {
      branch: 'Physics / Maths',
      skills: ['Data Analysis', 'Research', 'Advanced Maths'],
      jobs: ['Research Asst', 'Data Scientist', 'Lab Tech'],
      companies: ['ISRO', 'BARC', 'DRDO', 'Education']
    }
  ],
  BCom: [
    {
      branch: 'General',
      skills: ['Accounting', 'Taxation', 'Finance Analysis', 'Excel'],
      jobs: ['Accountant', 'Finance Analyst', 'Tax Consultant'],
      companies: ['HDFC', 'ICICI', 'KPMG', 'Ernst & Young']
    },
    {
      branch: 'Finance',
      skills: ['Investment Mgt', 'Risk Assessment', 'Corporate Finance'],
      jobs: ['Investment Banker', 'Risk Manager', 'Finance Advisor'],
      companies: ['Goldman Sachs', 'Morgan Stanley', 'Deloitte']
    }
  ]
};

const ConstellationPath = ({ degree, path }) => {
  const isCSE = path.branch.includes('CSE');
  
  const cols = [
    [{ id: 'degree', text: degree, type: 'degree' }],
    [{ id: 'branch', text: path.branch, type: 'branch' }],
    path.skills.map((s, i) => ({ id: `skill-${i}`, text: s, type: 'skill' })),
    path.jobs.map((j, i) => ({ id: `job-${i}`, text: j, type: 'job' })),
    path.companies.map((c, i) => ({ id: `company-${i}`, text: c, type: 'company' }))
  ];

  const colX = [10, 30, 50, 70, 90];
  const renderedNodes = {};
  
  cols.forEach((items, colIdx) => {
    const total = items.length;
    items.forEach((item, rowIdx) => {
      // Distribute nodes evenly along the Y axis between 20% and 85%
      const y = total === 1 ? 50 : 20 + (rowIdx / (total - 1)) * 65;
      item.x = colX[colIdx];
      item.y = y;
      renderedNodes[item.id] = item;
    });
  });

  const lines = [];

  const addLine = (id1, id2, isHighlighted = false) => {
    if (renderedNodes[id1] && renderedNodes[id2]) {
      lines.push({ 
        x1: renderedNodes[id1].x, 
        y1: renderedNodes[id1].y, 
        x2: renderedNodes[id2].x, 
        y2: renderedNodes[id2].y,
        isHighlighted
      });
      if (isHighlighted) {
        renderedNodes[id1].isHighlighted = true;
        renderedNodes[id2].isHighlighted = true;
      }
    }
  };

  // Define structured logical connections
  cols[1].forEach(branch => {
     addLine('degree', branch.id, isCSE); // highlight path to branch
  });

  cols[2].forEach((skill, i) => {
     addLine('branch', skill.id, isCSE && i === 1); // Web Dev highlighted
  });

  // Skills -> Jobs Mapping
  cols[2].forEach((skill, i) => {
     const jobTarget = Math.min(i, cols[3].length - 1);
     const isHi = isCSE && i === 1 && jobTarget === 1; // Web Dev -> Frontend Dev highlighted
     addLine(skill.id, cols[3][jobTarget].id, isHi);
  });

  // Jobs -> Companies Custom Mappings
  if (isCSE && cols[3].length >= 4 && cols[4].length >= 4) {
      // SW Eng (0) -> TCS (0), Infosys (1)
      addLine('job-0', 'company-0', false);
      addLine('job-0', 'company-1', false);
      
      // Frontend Dev (1) -> Google (2), Startups (3)
      addLine('job-1', 'company-2', true); // Highlighted path!
      addLine('job-1', 'company-3', false);
      
      // Backend Dev (2) -> Google (2), Startups (3)
      addLine('job-2', 'company-2', false);
      addLine('job-2', 'company-3', false);
      
      // Data Analyst (3) -> Infosys (1), Startups (3)
      addLine('job-3', 'company-1', false);
      addLine('job-3', 'company-3', false);
  } else {
     // Generic fallback structured connections
     cols[3].forEach((job, i) => {
       const compTarget = Math.min(i, cols[4].length - 1);
       const isHi = (i === 1) && (compTarget === 2); // default generic highlight
       addLine(job.id, cols[4][compTarget].id, isHi);
       
       if (cols[4][compTarget + 1]) {
         addLine(job.id, cols[4][compTarget + 1].id, false);
       }
     });
  }

  const columnHeaders = ['Degree', 'Branch', 'Skills', 'Jobs', 'Companies'];

  return (
    <div className="constellation-wrapper">
      <div className="galaxy-bg"></div>
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      
      {columnHeaders.map((header, idx) => (
        <div 
          key={header} 
          className="column-label" 
          style={{ left: `${colX[idx]}%`, top: '6%' }}
        >
          {header}
        </div>
      ))}

      <svg className="constellation-lines">
        {/* Draw normal lines first so highlighted lines appear on top */}
        {lines.filter(l => !l.isHighlighted).map((line, idx) => (
          <line key={`normal-${idx}`} x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`} className="constellation-line" />
        ))}
        {lines.filter(l => l.isHighlighted).map((line, idx) => (
          <line key={`hi-${idx}`} x1={`${line.x1}%`} y1={`${line.y1}%`} x2={`${line.x2}%`} y2={`${line.y2}%`} className="constellation-line highlight-line" />
        ))}
      </svg>

      {Object.values(renderedNodes).map((node) => (
        <div 
          key={node.id} 
          className={`constellation-node ${node.isHighlighted ? 'highlight-node' : ''}`} 
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className={`star-glow glow-${node.type} ${node.isHighlighted ? 'glow-highlight' : ''}`}></div>
          <div className={`star-core bg-core-${node.type} ${node.isHighlighted ? 'core-highlight' : ''}`}></div>
          <div className={`star-label ${node.isHighlighted ? 'label-highlight' : ''}`}>{node.text}</div>
        </div>
      ))}
    </div>
  );
};

export default function CareerPath() {
  const [studyField, setStudyField] = useState('CS + Maths');
  const [degree, setDegree] = useState('BTech');
  const [paths, setPaths] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    const selectedPaths = careerData[degree] || [];
    setPaths(selectedPaths);
    setHasGenerated(true);
  };

  return (
    <div className="feature-page-container">
      <div className="feature-header">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        </div>
        <h1>Career Path Constellation</h1>
        <p className="feature-description">
          Visualize your career journey as a structured space map connecting your education, skills, jobs, and dream companies.
        </p>
      </div>

      <div className="selection-container">
        <div className="form-group">
          <label>What did you study in 12th grade?</label>
          <select value={studyField} onChange={(e) => setStudyField(e.target.value)} className="cp-select">
            <option value="CS + Maths">CS + Maths</option>
            <option value="Biology + Maths">Biology + Maths</option>
            <option value="Commerce">Commerce</option>
            <option value="Humanities">Humanities</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Which degree do you want to pursue?</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)} className="cp-select">
            <option value="BTech">BTech</option>
            <option value="BSc">BSc</option>
            <option value="BCom">BCom</option>
          </select>
        </div>

        <button onClick={handleGenerate} className="generate-btn">
          Generate Career Map
        </button>
      </div>

      {hasGenerated && (
        <div className="paths-results-container">
          <h2 className="results-title">Galactic Pathways for {degree}</h2>
          
          <div className="paths-grid">
            {paths.length > 0 ? (
              paths.map((path, idx) => (
                <div key={idx} className="constellation-scroll-area">
                  <h3 className="constellation-title">{path.branch} Sector</h3>
                  <ConstellationPath degree={degree} path={path} />
                </div>
              ))
            ) : (
              <p>No specific career paths available for this selection.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
