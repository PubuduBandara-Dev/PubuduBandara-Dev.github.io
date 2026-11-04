export interface NavItem {
  label: string;
  href: string;
}

export interface ContactConfig {
  heading: string;
  subheading: string;
  formspreeEndpoint?: string;
  emailjs?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  directEmail: string;
  location?: string;
  status?: string;
}

export interface FeatureFlags {
  enableThemeToggle: boolean;
  enableParticleBackground: boolean;
  enableFilterCount: boolean;
  enableScrollProgress: boolean;
}

export interface SiteConfig {
  _comment?: string;
  siteTitle: string;
  siteDescription: string;
  author: string;
  canonicalUrl: string;
  navigation: NavItem[];
  contact: ContactConfig;
  features: FeatureFlags;
}
