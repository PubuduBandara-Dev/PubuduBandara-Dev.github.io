import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { DynamicIcon } from '../../components/common/DynamicIcon';
import type { AboutData } from '../../types';

interface AboutSectionProps {
  data: AboutData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        eyebrow="Leadership & Engineering"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Main Narrative Paragraphs */}
      <div className="max-w-4xl mx-auto mb-16 space-y-4">
        {data.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Core Architectural & Leadership Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm hover:border-primary-500/40 light:hover:border-primary-500/40 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/10 light:bg-primary-50 text-primary-400 light:text-primary-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all">
              <DynamicIcon name={pillar.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2 tracking-tight">
              {pillar.title}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
