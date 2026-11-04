export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface ProfileData {
  _comment?: string;
  name: string;
  title: string;
  headline: string;
  subtitle: string;
  shortBio: string;
  yearsOfExperience: string;
  currentRole: string;
  currentEmployer: string;
  location?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  avatarFallbackInitials?: string;
  cvPath?: string;
  availability?: string;
  stats?: StatItem[];
}
