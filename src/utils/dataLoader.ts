import profileRaw from '../data/profile.json';
import aboutRaw from '../data/about.json';
import skillsRaw from '../data/skills.json';
import experienceRaw from '../data/experience.json';
import projectsRaw from '../data/projects.json';
import certificationsRaw from '../data/certifications.json';
import educationRaw from '../data/education.json';
import socialLinksRaw from '../data/social-links.json';
import siteConfigRaw from '../data/site-config.json';

import type {
  ProfileData,
  AboutData,
  SkillsData,
  ExperienceData,
  ProjectsData,
  CertificationsData,
  EducationData,
  SocialLinksData,
  SiteConfig,
  ProjectItem,
} from '../types';

export const getProfile = (): ProfileData => profileRaw as ProfileData;
export const getAbout = (): AboutData => aboutRaw as AboutData;
export const getSkills = (): SkillsData => skillsRaw as SkillsData;
export const getExperience = (): ExperienceData => experienceRaw as ExperienceData;
export const getProjects = (): ProjectsData => projectsRaw as ProjectsData;
export const getCertifications = (): CertificationsData => certificationsRaw as CertificationsData;
export const getEducation = (): EducationData => educationRaw as EducationData;
export const getSocialLinks = (): SocialLinksData => socialLinksRaw as SocialLinksData;
export const getSiteConfig = (): SiteConfig => siteConfigRaw as SiteConfig;

/**
 * Returns unique filter tags aggregated from all project items.
 */
export const getAllProjectFilterTags = (projects: ProjectItem[]): string[] => {
  const set = new Set<string>();
  projects.forEach((p) => {
    p.filterTags?.forEach((t) => set.add(t));
  });
  return Array.from(set).sort();
};
