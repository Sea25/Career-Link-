import { skillResources, getFallbackResource } from '../data/skillResources.js';

/**
 * Generates roadmap steps for an array of missing skills.
 */
export const generateRoadmap = (missingSkills) => {
  if (!missingSkills || missingSkills.length === 0) return [];

  return missingSkills.map((skill, index) => {
    // Get predefined resource or fallback
    const resource = skillResources[skill] || getFallbackResource(skill);

    return {
      stepNumber: index + 1,
      skillName: skill,
      instruction: resource.description,
      youtubeLink: resource.youtube,
      websiteLink: resource.website,
      timeRequired: resource.timeRequired
    };
  });
};