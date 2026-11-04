import React, { useState } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { DynamicIcon } from '../../components/common/DynamicIcon';
import type { SocialLinkItem, ContactConfig } from '../../types';
import {
  Mail,
  MapPin,
  Clock,
  Download,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
  contactConfig: ContactConfig;
  socialLinks: SocialLinkItem[];
  cvUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactConfig,
  socialLinks,
  cvUrl,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const directEmail = contactConfig.directEmail || 'pubudu.bandara.dev@example.com';

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeading
        eyebrow="Initiate Conversation"
        title={contactConfig.heading}
        subtitle={contactConfig.subheading}
      />

      {/* Main Direct Communication Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Email Direct Action Card */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm flex flex-col justify-between group hover:border-primary-500/30 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Email Inquiry
            </div>
            <h3 className="mt-1 text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
              Direct Email
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono">
              {directEmail}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200 flex items-center gap-2">
            <a
              href={`mailto:${directEmail}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-sm focus-visible:outline-none"
            >
              <span>Compose Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => handleCopyEmail(directEmail)}
              className="p-2.5 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors focus-visible:outline-none"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Other Social & Professional Links */}
        {socialLinks
          .filter((link) => link.id !== 'email')
          .map((link) => {
            const isCV = link.id === 'cv';
            const targetUrl = isCV && cvUrl ? cvUrl : link.url;

            return (
              <div
                key={link.id}
                className="p-6 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm flex flex-col justify-between group hover:border-primary-500/30 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={link.icon} className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {link.platform}
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                    {link.description || link.platform}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono truncate">
                    {link.username || link.url}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200">
                  <a
                    href={targetUrl}
                    download={isCV ? true : undefined}
                    target={!isCV && targetUrl.startsWith('http') ? '_blank' : undefined}
                    rel={!isCV && targetUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-800 transition-colors shadow-sm focus-visible:outline-none"
                  >
                    <span>
                      {isCV ? 'Download Curriculum Vitae' : `Connect on ${link.platform}`}
                    </span>
                    {isCV ? (
                      <Download className="w-4 h-4 text-primary-400" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-primary-400" />
                    )}
                  </a>
                </div>
              </div>
            );
          })}
      </div>

      {/* Location & Availability Status Footer Bar */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#111827] to-slate-900/90 border border-white/5 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
            {contactConfig.status || 'Available for enterprise engineering and technical leadership'}
          </span>
        </div>

        {contactConfig.location && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <MapPin className="w-4 h-4 text-primary-400" />
            <span>Based in {contactConfig.location}</span>
          </div>
        )}
      </div>
    </section>
  );
};
