import React, { useMemo } from 'react';
import { useTheme } from './hooks/useTheme';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';

// Section components
import { HeroSection } from './sections/Hero/HeroSection';
import { AboutSection } from './sections/About/AboutSection';
import { SkillsSection } from './sections/Skills/SkillsSection';
import { ExperienceSection } from './sections/Experience/ExperienceSection';
import { ProjectsSection } from './sections/Projects/ProjectsSection';
import { CertificationsSection } from './sections/Certifications/CertificationsSection';
import { EducationSection } from './sections/Education/EducationSection';
import { ContactSection } from './sections/Contact/ContactSection';

// Data loading utilities
import {
  getProfile,
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getCertifications,
  getEducation,
  getSocialLinks,
  getSiteConfig,
} from './utils/dataLoader';

export function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  // Load all configurable JSON data
  const profile = useMemo(() => getProfile(), []);
  const about = useMemo(() => getAbout(), []);
  const skills = useMemo(() => getSkills(), []);
  const experience = useMemo(() => getExperience(), []);
  const projects = useMemo(() => getProjects(), []);
  const certifications = useMemo(() => getCertifications(), []);
  const education = useMemo(() => getEducation(), []);
  const socialLinks = useMemo(() => getSocialLinks(), []);
  const siteConfig = useMemo(() => getSiteConfig(), []);

  const cvUrl = profile.cvPath || socialLinks.links.find((l) => l.id === 'cv')?.url;

  return (
    <div className="relative min-h-screen selection:bg-primary-500/30 selection:text-white">
      {/* Dynamic Ambient Particle Background */}
      {siteConfig.features.enableParticleBackground && (
        <ParticleBackground isDark={isDark} />
      )}

      {/* Sticky Navigation Header */}
      <Navbar
        navItems={siteConfig.navigation}
        theme={theme}
        onToggleTheme={toggleTheme}
        cvUrl={cvUrl}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col gap-y-6 sm:gap-y-12">
        {/* Hero Section */}
        <HeroSection profile={profile} socialLinks={socialLinks.links} />

        {/* About Section */}
        <AboutSection data={about} />

        {/* Technical Skills Section */}
        <SkillsSection data={skills} />

        {/* Professional Experience Timeline */}
        <ExperienceSection data={experience} />

        {/* Featured Projects Showcase with Filtering & Detail Modal */}
        <ProjectsSection data={projects} />

        {/* Certifications Section */}
        <CertificationsSection data={certifications} />

        {/* Education Section */}
        <EducationSection data={education} />

        {/* Contact Section */}
        <ContactSection
          contactConfig={siteConfig.contact}
          socialLinks={socialLinks.links}
          cvUrl={cvUrl}
        />
      </main>

      {/* Footer */}
      <Footer
        name={profile.name}
        headline={profile.headline}
        socialLinks={socialLinks.links}
      />
    </div>
  );
}

export default App;
