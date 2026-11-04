import React from 'react';
import { ArrowUp } from 'lucide-react';
import { DynamicIcon } from '../common/DynamicIcon';
import type { SocialLinkItem } from '../../types';

interface FooterProps {
  name: string;
  headline: string;
  socialLinks: SocialLinkItem[];
}

export const Footer: React.FC<FooterProps> = ({ name, headline, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-[#070A11] dark:bg-[#070A11] light:bg-slate-50 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Title */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-white dark:text-white light:text-slate-900 text-base tracking-tight">
                {name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 font-mono">
                Assoc. Tech Lead
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md">
              {headline}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 border border-white/5 light:border-slate-300 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                aria-label={item.platform}
              >
                <DynamicIcon name={item.icon} className="w-4 h-4" />
              </a>
            ))}

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center shadow-md shadow-primary-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-white/5 light:border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {currentYear} {name}. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Engineered with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};
