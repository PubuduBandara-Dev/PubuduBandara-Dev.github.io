import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import type { EducationData } from '../../types';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface EducationSectionProps {
  data: EducationData;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data }) => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <SectionHeading
        eyebrow="Academic Background"
        title="Education"
        subtitle="Formal academic foundations in information technology, systems management, and enterprise software engineering."
      />

      <div className="space-y-6">
        {data.education.map((edu) => (
          <div
            key={edu.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm hover:border-primary-500/40 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="mt-1 text-sm font-semibold text-primary-400">
                    {edu.institution}
                  </div>
                  {edu.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {edu.period && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 sm:text-right shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>
              )}
            </div>

            {/* Coursework & Degree Highlights */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="mt-6 pt-5 border-t border-white/5 light:border-slate-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Academic Focus & Highlights
                </h4>
                <ul className="space-y-2">
                  {edu.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 flex items-start gap-2.5 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
