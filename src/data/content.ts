import metricsData from './homepage_details/metrics.json';
import experienceData from './homepage_details/experience.json';
import certificationsData from './homepage_details/certifications.json';
import skillsData from './homepage_details/skills.json';
import linksData from './homepage_details/links.json';
import mainProjectConfig from './project_details/main_config.json';

export const metrics = metricsData;
export const experience = experienceData;
export const certifications = certificationsData;
export const skills = skillsData;
export const links = linksData;

// Dynamically import all project configs
const projectModules = import.meta.glob('./project_details/*/config.json', { eager: true }) as Record<string, { default: any }>;

export const projects = mainProjectConfig
  .sort((a, b) => a.rank - b.rank)
  .map(config => {
    const modulePath = `./project_details/${config.projectCode}/config.json`;
    const projectModule = projectModules[modulePath];
    
    if (!projectModule) {
      console.warn(`Missing config.json for project: ${config.projectCode}`);
      return null;
    }
    
    const details = projectModule.default;
    
    // Combine key skill with the other skills, removing duplicates
    const otherSkills = details.skills ? details.skills.split(',').map((s: string) => s.trim()) : [];
    const technologies = [config.keySkill, ...otherSkills].filter((v, i, a) => a.indexOf(v) === i);

    return {
      id: config.projectCode,
      title: details.title,
      description: details.shortDescription,
      longDescription: details.longDescription,
      technologies,
      hashnodeUrl: details.hashnodeFlag ? details.hashnodeLink : undefined,
      githubUrl: details.githubLinkFlag ? details.githubLink : undefined,
      projectUrl: details.projectLinkFlag ? details.projectLink : undefined,
    };
  })
  .filter((project): project is NonNullable<typeof project> => project !== null);
