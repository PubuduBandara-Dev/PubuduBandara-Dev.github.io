export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  projectType: string;
  employer: string;
  client?: string | null;
  website?: string | null;
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  featured: boolean;
  image?: string;
  description: string;
  role: string;
  keyCapabilities: string[];
  operationalNote?: string;
  technologies: string[];
  filterTags: string[];
}

export interface ProjectsData {
  _comment?: string;
  projects: ProjectItem[];
}
