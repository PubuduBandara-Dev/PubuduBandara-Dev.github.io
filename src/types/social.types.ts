export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  username?: string;
  icon: string;
  isPrimary?: boolean;
  description?: string;
}

export interface SocialLinksData {
  _comment?: string;
  links: SocialLinkItem[];
}
