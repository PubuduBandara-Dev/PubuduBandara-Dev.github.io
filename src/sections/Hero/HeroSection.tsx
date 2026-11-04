import React from 'react';
import {
  ArrowDown,
  Download,
  FolderGit2,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../components/common/BrandIcons';
import type { ProfileData, SocialLinkItem } from '../../types';
import { Badge } from '../../components/common/Badge';

interface HeroSectionProps {
  profile: ProfileData;
  socialLinks: SocialLinkItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, socialLinks }) => {
  const avatarSrc = React.useMemo(() => {
    if (!profile.avatarUrl) return '';
    if (profile.avatarUrl.startsWith('http') || profile.avatarUrl.startsWith('data:')) {
      return profile.avatarUrl;
    }
    const cleanPath = profile.avatarUrl.replace(/^\.?\//, '');
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}${cleanPath}`;
  }, [profile.avatarUrl]);

  const [currentSrc, setCurrentSrc] = React.useState(avatarSrc);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(avatarSrc);
    setImageError(false);
  }, [avatarSrc]);

  const handleImageError = () => {
    if (currentSrc.endsWith('.jpg')) {
      setCurrentSrc(currentSrc.replace(/\.jpg$/, '.jpeg'));
    } else if (currentSrc.endsWith('.jpeg')) {
      setCurrentSrc(currentSrc.replace(/\.jpeg$/, '.jpg'));
    } else {
      setImageError(true);
    }
  };

  const showAvatar = Boolean(currentSrc && !imageError);

  const linkedinLink = socialLinks.find((l) => l.id === 'linkedin')?.url || '#';
  const githubLink = socialLinks.find((l) => l.id === 'github')?.url || '#';
  const emailLink = socialLinks.find((l) => l.id === 'email')?.url || `mailto:${profile.email}`;
  const cvLink = React.useMemo(() => {
    const rawPath = profile.cvPath || socialLinks.find((l) => l.id === 'cv')?.url || '#';
    if (!rawPath || rawPath.startsWith('http') || rawPath.startsWith('#')) return rawPath;
    const cleanPath = rawPath.replace(/^\.?\//, '');
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}${cleanPath}`;
  }, [profile.cvPath, socialLinks]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto w-full z-10 text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 border border-emerald-500/30 mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-medium">
            {profile.availability || 'Available for Technical Leadership & Enterprise Solutions'}
          </span>
        </div>

        {/* Profile Avatar / Monogram */}
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 light:from-slate-100 light:to-slate-200 border-2 border-primary-500/40 p-1 shadow-xl shadow-primary-500/10 mx-auto flex items-center justify-center overflow-hidden">
            {showAvatar ? (
              <img
                src={currentSrc}
                alt={profile.name}
                className="w-full h-full object-cover rounded-xl"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-600 via-sky-600 to-slate-900 rounded-xl flex items-center justify-center text-white font-mono font-bold text-3xl">
                {profile.avatarFallbackInitials || 'PB'}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-white p-1 rounded-lg border border-white/10 light:border-slate-300">
            <Sparkles className="w-4 h-4 text-primary-400" />
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
          {profile.name}
        </h1>

        <p className="mt-3 text-lg sm:text-xl font-semibold text-primary-400 tracking-tight">
          {profile.title}
        </p>

        {/* Headline Tech Badges */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {profile.headline.split('|').map((item, index) => (
            <span
              key={index}
              className="text-xs sm:text-sm font-medium px-3 py-1 rounded-md bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 light:border-slate-300"
            >
              {item.trim()}
            </span>
          ))}
        </div>

        {/* Short Introduction */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {profile.shortBio}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={cvLink}
            download
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </a>

          <button
            onClick={() => scrollTo('#projects')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 hover:bg-slate-700/80 light:hover:bg-slate-200 border border-slate-700 light:border-slate-300 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <FolderGit2 className="w-4 h-4 text-primary-400" />
            <span>View Projects</span>
          </button>

          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary-400 hover:text-white bg-primary-500/10 hover:bg-primary-500 border border-primary-500/30 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Social Quick Links */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-400 hover:text-primary-400 hover:border-primary-500/30 border border-white/5 light:border-slate-200 transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-400 hover:text-primary-400 hover:border-primary-500/30 border border-white/5 light:border-slate-200 transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={emailLink}
            className="p-2.5 rounded-lg bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-400 hover:text-primary-400 hover:border-primary-500/30 border border-white/5 light:border-slate-200 transition-all"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          {profile.location && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono pl-2">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              {profile.location}
            </span>
          )}
        </div>

        {/* Animated Experience Counters / Stats Grid */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/80 border border-white/5 light:border-slate-200 backdrop-blur-sm text-center shadow-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 font-mono flex items-center justify-center">
                  <span>{stat.value}</span>
                  <span className="text-primary-400">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="mt-12">
          <button
            onClick={() => scrollTo('#about')}
            className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors focus-visible:outline-none"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              Explore
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-primary-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
