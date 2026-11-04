export type SkillProficiencyLevel = 'Experienced' | 'Working Knowledge' | 'Familiarity';

export interface SkillItem {
  name: string;
  level?: SkillProficiencyLevel | string;
  highlight?: boolean;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  skills: SkillItem[];
}

export interface SkillsData {
  _comment?: string;
  categories: SkillCategory[];
}
