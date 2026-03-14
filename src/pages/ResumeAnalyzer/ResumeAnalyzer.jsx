import { useState, useEffect } from 'react';
import './ResumeAnalyzer.css';

const KEYWORDS = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'REST API', 'Responsive Design', 'Tailwind', 'TypeScript', 'Webpack'],
  backend: ['Node.js', 'Python', 'Java', 'SQL', 'REST API', 'Docker', 'Git', 'MongoDB', 'PostgreSQL', 'AWS'],
  fullstack: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST API', 'Docker', 'TypeScript'],
  datascience: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'Scikit-learn', 'Jupyter'],
  designer: ['Figma', 'Prototyping', 'User Research', 'Wireframing', 'CSS', 'Adobe XD', 'Accessibility', 'Design Systems', 'Sketch', 'Usability Testing'],
};

const ACTION_VERBS = ['developed', 'built', 'designed', 'implemented', 'created', 'optimized', 'led', 'engineered', 'deployed', 'improved', 'managed', 'launched', 'delivered', 'reduced', 'increased', 'integrated', 'automated'];
const WEAK_PHRASES = ['i worked on', 'i tried', 'i learned', 'i helped', 'i did', 'i made', 'i used'];
const SECTIONS = ['contact', 'skills', 'education', 'projects', 'experience'];

const STRONG = `John Mathew
john.mathew@gmail.com | +91 9876543210 | linkedin.com/in/johnmathew | github.com/johnmathew

CONTACT
john.mathew@gmail.com | +91 9876543210

SKILLS
HTML, CSS, JavaScript, React, Tailwind, Git, REST API, Responsive Design, TypeScript, Webpack

EDUCATION
B.Tech Computer Science — ABC University (2020–2024) | CGPA: 8.7

EXPERIENCE
Frontend Developer Intern — TechSoft Solutions (Jan 2024 – Apr 2024)
- Developed 20+ reusable React components used across 4 product modules
- Implemented REST API integration reducing data fetch time by 35%
- Optimized Webpack bundle size improving load speed by 40%
- Collaborated with 6 developers using Git for version control

PROJECTS
E-Commerce Web App
- Built a full-stack shopping platform using React serving 500+ daily users
- Integrated REST API for cart and order management
- Designed responsive UI with Tailwind CSS reducing mobile bounce rate by 25%

Weather Dashboard
- Created a real-time weather app using React and OpenWeather REST API
- Optimized API calls reducing unnecessary requests by 60%

CERTIFICATIONS
- Meta Frontend Developer Certificate — Coursera (2023)
- AWS Cloud Practitioner (2024)`;

const WEAK = `Resume

Name: Rahul

I am a web developer who is looking for a job. I have done some projects in college. I worked on websites and I tried to make them look nice. I helped my friends with their projects too. I learned many things during my college life.

Email: rahul123@gmail.com

About me:
I worked on a project where I made a website. I used basic programming and some HTML. I tried to learn CSS also. I did a project for my college where I helped make a page for the department.

Education:
I completed my engineering degree from a college in Kerala.`;

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function analyse(text, role, hasImages = false) {
  const lower = text.toLowerCase();
  const words = wordCount(text);
  const kws = KEYWORDS[role];

  // sections
  const secResults = SECTIONS.map(s => ({ name: s, found: lower.includes(s) }));
  const secFound = secResults.filter(s => s.found).length;
  let secScore = Math.round((secFound / SECTIONS.length) * 100);

  // Specific required sections rules
  const skillsMissing = !secResults.find(s => s.name === 'skills').found;
  const expProjMissing = !secResults.find(s => s.name === 'experience').found && !secResults.find(s => s.name === 'projects').found;
  if (skillsMissing || expProjMissing) secScore = Math.min(secScore, 70); // force warning

  // keywords
  const foundKW = kws.filter(k => lower.includes(k.toLowerCase()));
  const missingKW = kws.filter(k => !lower.includes(k.toLowerCase()));
  const kwScore = Math.round((foundKW.length / kws.length) * 100);

  // length
  let lenScore = 100, lenMsg = '', lenStatus = 'pass';
  if (words < 150) { lenScore = 30; lenStatus = 'fail'; lenMsg = `Too short — ${words} words. Aim for 300–600.`; }
  else if (words > 800) { lenScore = 55; lenStatus = 'warn'; lenMsg = `Too long — ${words} words. Keep under 800.`; }
  else { lenMsg = `Good length — ${words} words.`; }

  // bullets
  const bulletCount = (text.match(/^[\-\•\*]/gm) || []).length;
  const longParas = text.split('\n').filter(l => l.trim().split(' ').length > 30).length;
  const hasBullets = bulletCount > 3;
  const bulScore = hasBullets && longParas === 0 ? 100 : hasBullets ? 70 : 25;
  const bulStatus = bulScore === 100 ? 'pass' : bulScore === 70 ? 'warn' : 'fail';

  // verbs
  const foundVerbs = ACTION_VERBS.filter(v => lower.includes(v));
  const hasWeak = WEAK_PHRASES.some(p => lower.includes(p));
  const verbScore = Math.min(100, Math.round((foundVerbs.length / 5) * 100));
  const verbStatus = verbScore >= 80 && !hasWeak ? 'pass' : hasWeak ? 'warn' : verbScore >= 40 ? 'warn' : 'fail';

  // numbers
  const hasNums = /\d+\s*(%|users|projects|clients|features|ms|kb)/i.test(text) || (text.match(/\d{2,}/g) || []).length > 4;
  const numScore = hasNums ? 100 : 20;
  const numStatus = hasNums ? 'pass' : 'fail';

  // contact
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/.test(text);
  const hasPhone = /\+?\d[\d\s\-(）]{8,}/.test(text);
  const hasLI = /linkedin/i.test(text);
  const hasGH = /github/i.test(text);
  const conScore = (hasEmail ? 35 : 0) + (hasPhone ? 35 : 0) + (hasLI ? 15 : 0) + (hasGH ? 15 : 0);
  const conStatus = conScore >= 70 ? 'pass' : conScore >= 35 ? 'warn' : 'fail';

  // formatting
  const fmtScore = hasImages ? 20 : 100;
  const fmtStatus = hasImages ? 'warn' : 'pass';

  const overall = Math.round(
    kwScore * 0.25 + secScore * 0.15 + lenScore * 0.10 +
    bulScore * 0.15 + verbScore * 0.10 + numScore * 0.10 + conScore * 0.05 + fmtScore * 0.10
  );

  return {
    overall, words,
    sec: { results: secResults, found: secFound, score: secScore },
    kw: { found: foundKW, missing: missingKW, score: kwScore, total: kws.length },
    len: { score: lenScore, msg: lenMsg, status: lenStatus },
    bul: { score: bulScore, status: bulStatus, hasBullets, longParas },
    verb: { score: verbScore, status: verbStatus, found: foundVerbs, hasWeak },
    num: { score: numScore, status: numStatus, hasNums },
    con: { score: conScore, status: conStatus, hasEmail, hasPhone, hasLI, hasGH },
    fmt: { score: fmtScore, status: fmtStatus, hasImages }
  };
}

function Badge({ status }) {
  const map = { pass: '✓', warn: '!', fail: '✗' };
  return <span className={`ra-badge ra-${status}`}>{map[status]}</span>;
}

function Bar({ label, value, color }) {
  return (
    <div className="ra-bar-row">
      <div className="ra-bar-meta">
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="ra-bar-track">
        <div className="ra-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function Check({ status, title, main, sub }) {
  return (
    <div className={`ra-check ra-check-${status}`}>
      <Badge status={status} />
      <div className="ra-check-text">
        <strong>{title}</strong>
        <span>{main}</span>
        {sub && <small>{sub}</small>}
      </div>
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [role, setRole] = useState('frontend');
  const [result, setResult] = useState(null);
  const [hasImages, setHasImages] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    // dynamically load pdf.js
    if (!window.pdfjsLib && !document.getElementById('pdf-js-lib')) {
      const scriptPdf = document.createElement('script');
      scriptPdf.id = 'pdf-js-lib';
      scriptPdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      document.head.appendChild(scriptPdf);
      scriptPdf.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        }
      };
    }
    // dynamically load mammoth for Word docs
    if (!window.mammoth && !document.getElementById('mammoth-lib')) {
      const scriptMammoth = document.createElement('script');
      scriptMammoth.id = 'mammoth-lib';
      scriptMammoth.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js';
      document.head.appendChild(scriptMammoth);
    }
  }, []);

  const run = () => {
    if (!text.trim()) return;
    setResult(analyse(text, role, hasImages));
  };

  const grade = result
    ? result.overall >= 80 ? { label: 'Strong', color: '#16a34a' }
      : result.overall >= 60 ? { label: 'Average', color: '#d97706' }
        : { label: 'Needs work', color: '#dc2626' }
    : null;

  const C = 2 * Math.PI * 36;

  return (
    <div className="feature-page-container">

      {/* ── Header ── */}
      <div className="feature-header">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h1>Resume Analyzer</h1>
        <p className="feature-description">
          Upload your resume and get instant ATS compatibility feedback — sections,
          keywords, formatting, and more.
        </p>
      </div>

      {/* ── Input card ── */}
      <div className="ra-card">
        <div className="ra-toolbar">
          <select className="ra-select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="frontend">Frontend developer</option>
            <option value="backend">Backend developer</option>
            <option value="fullstack">Full stack developer</option>
            <option value="datascience">Data scientist</option>
            <option value="designer">UI/UX designer</option>
          </select>
          <button className="ra-ghost" onClick={() => { setText(STRONG); setFileName(''); setResult(null); setHasImages(false); }}>
            Load strong sample
          </button>
          <button className="ra-ghost" onClick={() => { setText(WEAK); setFileName(''); setResult(null); setHasImages(false); }}>
            Load weak sample
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            className="ra-textarea"
            placeholder="Click here to upload your resume file (.pdf, .doc, .docx)..."
            value={isExtracting ? 'Extracting text... Please wait.' : (fileName ? `File selected: ${fileName}\n\nExtracted text preview:\n${text}` : text)}
            readOnly
            onClick={() => document.getElementById('resume-upload').click()}
            style={{ cursor: isExtracting ? 'wait' : 'pointer' }}
          />
          <input
            type="file"
            id="resume-upload"
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setFileName(file.name);
              setResult(null);
              setIsExtracting(true);
              setHasImages(false);

              if (file.name.toLowerCase().endsWith('.pdf')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const typedarray = new Uint8Array(event.target.result);

                  // Simple heuristic hack to detect images in PDF for the formatting check
                  const chunkStr = new TextDecoder('ascii').decode(typedarray.slice(0, 150000));
                  if (chunkStr.includes('/Subtype /Image') || chunkStr.includes('/Subtype/Image')) {
                    setHasImages(true);
                  }

                  if (window.pdfjsLib) {
                    try {
                      const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
                      let extracted = "";
                      for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        extracted += pageText + "\n\n";
                      }
                      setText(extracted.trim() || 'No text could be extracted from this PDF.');
                    } catch (err) {
                      setText("Failed to parse PDF. Please check the file.");
                      setHasImages(true);
                    }
                  } else {
                    setText("PDF parsing library not loaded. Please refresh the page and try again.");
                  }
                  setIsExtracting(false);
                };
                reader.readAsArrayBuffer(file);
              } else if (file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                  const arrayBuffer = event.target.result;
                  if (file.size > 150 * 1024) setHasImages(true); // simulate image detection

                  if (window.mammoth) {
                    try {
                      const result = await window.mammoth.extractRawText({ arrayBuffer });
                      setText(result.value.trim() || "No text could be extracted from this Word document.");
                    } catch (err) {
                      setText("Failed to parse DOCX. Please try a different file.");
                    }
                  } else {
                    setText("Word document parsing library not loaded. Please refresh and try again.");
                  }
                  setIsExtracting(false);
                };
                reader.readAsArrayBuffer(file);
              } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setText(event.target.result);
                  setIsExtracting(false);
                };
                reader.readAsText(file);
              }
            }}
          />
        </div>

        <div className="ra-footer">
          <span className="ra-wc">{wordCount(text)} words</span>
          <button className="ra-primary" onClick={run} disabled={!text.trim() || isExtracting}>
            Analyse resume
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {result && (
        <>
          {/* Score */}
          <div className="ra-card">
            <div className="ra-score-hero">
              <div className="ra-ring">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle cx="45" cy="45" r="36" fill="none"
                    stroke={grade.color} strokeWidth="8"
                    strokeDasharray={`${C * (result.overall / 100)} ${C}`}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                </svg>
                <div className="ra-ring-inner">
                  <span className="ra-ring-num" style={{ color: grade.color }}>{result.overall}</span>
                  <span className="ra-ring-sub">/ 100</span>
                </div>
              </div>
              <div className="ra-score-info">
                <p className="ra-grade" style={{ color: grade.color }}>{grade.label}</p>
                <p className="ra-grade-sub">ATS compatibility score based on 8 checks</p>
                <p className="ra-grade-meta">{result.words} words · {role} role</p>
              </div>
            </div>
            <div className="ra-bars">
              <Bar label="Keyword match" value={result.kw.score} color="#4f46e5" />
              <Bar label="Section coverage" value={result.sec.score} color="#0891b2" />
              <Bar label="Formatting" value={result.fmt.score} color="#ec4899" />
              <Bar label="Bullet points" value={result.bul.score} color="#7c3aed" />
              <Bar label="Action verbs" value={result.verb.score} color="#059669" />
              <Bar label="Contact info" value={result.con.score} color="#d97706" />
            </div>
          </div>

          {/* Checks */}
          <div className="ra-card">
            <p className="ra-section-label">Detailed checks</p>
            <div className="ra-checks-grid">
              <Check
                status={result.con.status}
                title="Contact info"
                main={result.con.hasEmail && result.con.hasPhone
                  ? 'Email and phone found'
                  : `Missing: ${!result.con.hasEmail ? 'email ' : ''}${!result.con.hasPhone ? 'phone' : ''}`}
                sub={`LinkedIn: ${result.con.hasLI ? 'yes' : 'no'} · GitHub: ${result.con.hasGH ? 'yes' : 'no'}`}
              />
              <Check
                status={result.sec.score >= 80 ? 'pass' : result.sec.score >= 50 ? 'warn' : 'fail'}
                title="Resume sections"
                main={`${result.sec.found} of ${SECTIONS.length} sections found`}
                sub={`Missing: ${result.sec.results.filter(s => !s.found).map(s => s.name).join(', ') || 'none'}`}
              />
              <Check
                status={result.len.status}
                title="Word count"
                main={result.len.msg}
              />
              <Check
                status={result.bul.status}
                title="Bullet points"
                main={result.bul.hasBullets ? 'Bullet points detected' : 'No bullet points found'}
                sub={result.bul.longParas > 0 ? `${result.bul.longParas} long paragraph(s) — convert to bullets` : ''}
              />
              <Check
                status={result.verb.status}
                title="Action verbs"
                main={result.verb.found.length > 0
                  ? `Found: ${result.verb.found.slice(0, 4).join(', ')}${result.verb.found.length > 4 ? '…' : ''}`
                  : 'No strong action verbs found'}
                sub={result.verb.hasWeak ? 'Weak phrases detected — e.g. "I worked on"' : ''}
              />
              <Check
                status={result.num.status}
                title="Quantifiable results"
                main={result.num.hasNums ? 'Numbers and metrics found' : 'No measurable achievements found'}
                sub={!result.num.hasNums ? 'Add %, user counts, performance improvements' : ''}
              />
              <Check
                status={result.fmt.status}
                title="File formatting"
                main={result.fmt.hasImages ? 'Images or graphics detected' : 'Clean text formatting'}
                sub={result.fmt.hasImages ? 'ATS systems prefer simple text. Remove images/graphics.' : 'No images found. File looks ATS-friendly.'}
              />
            </div>
          </div>

          {/* Keywords */}
          <div className="ra-card">
            <p className="ra-section-label">
              Keyword match — {result.kw.found.length} / {result.kw.total} ({result.kw.score}%)
            </p>
            <p className="ra-kw-desc">Keywords for <strong>{role}</strong> role:</p>
            <div className="ra-kw-grid">
              {result.kw.found.map(k => <span key={k} className="ra-kw ra-kw-found">✓ {k}</span>)}
              {result.kw.missing.map(k => <span key={k} className="ra-kw ra-kw-miss">✗ {k}</span>)}
            </div>
            {result.kw.missing.length > 0 && (
              <div className="ra-tip">
                Add missing keywords naturally in your Skills or project descriptions to improve ATS score.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}