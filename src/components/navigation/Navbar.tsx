import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import type { NavItem } from '../../types';
import { cn } from '../../utils/cn';

interface NavbarProps {
  navItems: NavItem[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  cvUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  navItems,
  theme,
  onToggleTheme,
  cvUrl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  const sectionIds = navItems.map((item) => item.href.replace('#', ''));
  const activeSectionId = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#0B0F19]/90 dark:bg-[#0B0F19]/90 light:bg-white/90 backdrop-blur-md border-b border-white/10 light:border-slate-200/80 shadow-lg shadow-black/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 via-sky-400 to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-lg p-1"
            aria-label="Pubudu Nuwan Bandara - Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-sky-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              PB
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-primary-400 transition-colors">
                Pubudu Bandara
              </span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                Assoc. Tech Lead
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSectionId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 relative',
                    isActive
                      ? 'text-white dark:text-white light:text-slate-900 font-semibold'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-100'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary-400 rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Quick CV Download or Contact CTA */}
            {cvUrl && (
              <a
                href={cvUrl}
                download
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-sm shadow-primary-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <span>CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden pt-20 px-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#111827] dark:bg-[#111827] light:bg-white rounded-2xl p-6 border border-white/10 light:border-slate-200 shadow-2xl max-w-sm mx-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 light:border-slate-200">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSectionId === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                      isActive
                        ? 'bg-primary-500/10 text-primary-400 font-semibold'
                        : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/5 light:hover:bg-slate-100'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />}
                  </a>
                );
              })}
            </nav>

            {cvUrl && (
              <div className="mt-6 pt-4 border-t border-white/10 light:border-slate-200">
                <a
                  href={cvUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-sm"
                >
                  <span>Download Curriculum Vitae</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
