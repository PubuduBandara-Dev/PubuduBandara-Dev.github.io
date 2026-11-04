export interface CertificationItem {
  id: string;
  name: string;
  code?: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string;
  badgeImage?: string;
  skillsValidated?: string[];
  isVerified?: boolean;
}

export interface CertificationsData {
  _comment?: string;
  certifications: CertificationItem[];
}
