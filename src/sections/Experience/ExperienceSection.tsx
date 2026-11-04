import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Badge } from '../../components/common/Badge';
import type { ExperienceData } from '../../types';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
  FolderGit2,
  Building2,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExperienceSectionProps {
  data: ExperienceData;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <SectionHeading
        eyebrow="Career Timeline"
        title="Professional Experience"
        subtitle="Nearly seven years of advancing software engineering roles, enterprise delivery, and technical team leadership."
      />

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 dark:border-slate-800 light:border-slate-300 space-y-12 sm:space-y-16">
        {data.experiences.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Marker Node */}
            <div
              className={cn(
                'absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 flex items-center justify-center transition-all',
                item.isCurrent
                  ? 'bg-primary-500 border-[#0B0F19] dark:border-[#0B0F19] light:border-white ring-4 ring-primary-500/20'
                  : 'bg-slate-700 border-[#0B0F19] dark:border-[#0B0F19] light:border-white ring-2 ring-slate-800'
              )}
            >
              {item.isCurrent && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm hover:border-primary-500/30 transition-all">
              {/* Header: Company & Employment Dates */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5 light:border-slate-200">
                <div>
                  <div className="flex items-center flex-wrap gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                      {item.company}
                    </h3>
                    {item.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Current Employer
                      </span>
                    )}
                    {item.employmentType && (
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                        • {item.employmentType}
                      </span>
                    )}
                  </div>

                  {item.companyDescription && (
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {item.companyDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-primary-400 sm:text-right shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Client Note if present (e.g., e-VIS Australia) */}
              {item.clientNote && (
                <div className="mt-4 px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{item.clientNote}</span>
                </div>
              )}

              {/* Roles / Promotions within Company */}
              {item.roles && item.roles.length > 0 && (
                <div className="mt-5 space-y-3">
                  {item.roles.map((role, rIdx) => (
                    <div
                      key={rIdx}
                      className={cn(
                        'p-3.5 rounded-xl border transition-colors',
                        role.isCurrent
                          ? 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-50 border-primary-500/30'
                          : 'bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50/50 border-white/5 light:border-slate-200'
                      )}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          {rIdx > 0 && (
                            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          <span className="font-semibold text-sm text-white dark:text-white light:text-slate-900">
                            {role.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-500">
                          {role.period}
                        </span>
                      </div>
                      {role.summary && (
                        <p className="mt-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                          {role.summary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Responsibilities list */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 mb-3">
                  Key Responsibilities & Impact
                </h4>
                <ul className="space-y-2.5">
                  {item.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Associated Projects if specified */}
              {item.associatedProjects && item.associatedProjects.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200">
                  <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-primary-400" />
                    <span>Delivered Projects:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.associatedProjects.map((pName, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5"
                      >
                        {pName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack Tags */}
              <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech, tIdx) => (
                    <Badge key={tIdx} variant="subtle" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
