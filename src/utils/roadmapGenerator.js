export const generateRoadmap = (missingSkills) => {
  if (!missingSkills || missingSkills.length === 0) return [];
  
  return missingSkills.map((skill, index) => ({
    id: index,
    title: `Learn ${skill}`,
    description: `Master the fundamentals of ${skill}.`,
  }));
};