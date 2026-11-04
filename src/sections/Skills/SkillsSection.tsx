import React, { useState } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { DynamicIcon } from '../../components/common/DynamicIcon';
import { Badge } from '../../components/common/Badge';
import type { SkillsData, SkillCategory, SkillProficiencyLevel } from '../../types';
import { cn } from '../../utils/cn';

interface SkillsSectionProps {
  data: SkillsData;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories =
    selectedCategory === 'all'
      ? data.categories
      : data.categories.filter((cat) => cat.id === selectedCategory);

  const getLevelBadge = (level?: SkillProficiencyLevel | string) => {
    if (!level) return null;
    switch (level) {
      case 'Experienced':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-500/15 text-primary-300 border border-primary-500/30">
            {level}
          </span>
        );
      case 'Working Knowledge':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
            {level}
          </span>
        );
      case 'Familiarity':
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700/40 text-slate-400 border border-slate-700/50">
            {level}
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            {level}
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        eyebrow="Technical Stack"
        title="Technical Skills & Competencies"
        subtitle="Configurable technology matrix spanning enterprise backend architecture, cloud infrastructure, modern web frameworks, and emerging AI technologies."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-medium transition-all focus-visible:outline-none',
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/5 light:border-slate-300'
          )}
        >
          All Domains ({data.categories.length})
        </button>
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all focus-visible:outline-none',
              selectedCategory === cat.id
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/5 light:border-slate-300'
            )}
          >
            <DynamicIcon name={cat.icon} className="w-3.5 h-3.5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="p-6 sm:p-7 rounded-2xl bg-[#111827]/70 dark:bg-[#111827]/70 light:bg-white border border-white/5 light:border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center">
                  <DynamicIcon name={category.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Badges with optional levels */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      skill.highlight
                        ? 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-white dark:text-white light:text-slate-900 border border-primary-500/30'
                        : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-white/5 light:border-slate-200'
                    )}
                  >
                    <span>{skill.name}</span>
                    {getLevelBadge(skill.level)}
                  </div>
                ))}
              </div>
            </div>

            {/* Category summary count */}
            <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{category.skills.length} Technologies</span>
              <span className="text-primary-400">Production Tested</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
