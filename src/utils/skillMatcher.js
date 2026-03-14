import { jobRoles } from '../data/roles.js';

/**
 * Normalizes an array of skills or a comma-separated string of skills
 * by trimming whitespace and converting to lowercase for better matching.
 */
export const normalizeSkills = (skillsInput) => {
  let skillArray = [];
  if (typeof skillsInput === 'string') {
    skillArray = skillsInput.split(',');
  } else if (Array.isArray(skillsInput)) {
    skillArray = skillsInput;
  }
  
  return skillArray
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0)
    .map(skill => skill.toLowerCase());
};

/**
 * Gets the required skills for a given job role.
 */
export const getRequiredSkills = (role) => {
  return jobRoles[role] || [];
};

/**
 * Compares current skills against required skills and returns the matched skills.
 */
export const getMatchedSkills = (currentSkills, requiredSkills) => {
  const normalizedCurrent = normalizeSkills(currentSkills);
  return requiredSkills.filter(reqSkill => 
    normalizedCurrent.includes(reqSkill.toLowerCase())
  );
};

/**
 * Compares current skills against required skills and returns the missing skills.
 */
export const getMissingSkills = (currentSkills, requiredSkills) => {
  const normalizedCurrent = normalizeSkills(currentSkills);
  return requiredSkills.filter(reqSkill => 
    !normalizedCurrent.includes(reqSkill.toLowerCase())
  );
};

/**
 * Calculates the match percentage between current and required skills.
 */
export const calculateMatchPercentage = (matchedCount, totalRequiredCount) => {
  if (totalRequiredCount === 0) return 0;
  const percentage = (matchedCount / totalRequiredCount) * 100;
  return Math.round(percentage);
};
