export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  highlights?: string[];
}

export interface EducationData {
  _comment?: string;
  education: EducationItem[];
}
