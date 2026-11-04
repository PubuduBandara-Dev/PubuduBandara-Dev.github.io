export interface ExperienceRole {
  title: string;
  period: string;
  isCurrent?: boolean;
  summary?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  companyDescription?: string;
  period: string;
  isCurrent: boolean;
  location?: string;
  employmentType?: string;
  clientNote?: string;
  roles?: ExperienceRole[];
  responsibilities: string[];
  technologies: string[];
  associatedProjects?: string[];
}

export interface ExperienceData {
  _comment?: string;
  experiences: ExperienceItem[];
}
