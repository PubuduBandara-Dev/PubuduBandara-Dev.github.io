import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { ProjectsData, ProjectItem } from '../../types';
import { Filter, Layers } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProjectsSectionProps {
  data: ProjectsData;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Filter options as explicitly specified in requirements
  const primaryFilterOptions = [
    'All',
    '.NET',
    'React',
    'Vue.js',
    'Azure',
    'SQL Server',
    'IoT',
    'Generative AI',
    'Agentic AI',
    'Enterprise Applications',
    'Government Solutions',
  ];

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return data.projects;
    return data.projects.filter((project) =>
      project.filterTags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [data.projects, selectedTag]);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <SectionHeading
        eyebrow="Portfolio Showcase"
        title="Featured Enterprise Projects & Solutions"
        subtitle="Mission-critical platforms spanning distributed enterprise applications, cloud architectures, IoT telematics, and agentic AI systems."
      />

      {/* Filter Bar */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
          <Filter className="w-3.5 h-3.5 text-primary-400" />
          <span>Filter by Technology & Domain:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {primaryFilterOptions.map((tag) => {
            const isSelected = selectedTag === tag;
            const count =
              tag === 'All'
                ? data.projects.length
                : data.projects.filter((p) =>
                    p.filterTags?.some((t) => t.toLowerCase() === tag.toLowerCase())
                  ).length;

            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 focus-visible:outline-none',
                  isSelected
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                    : 'bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-slate-100 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/5 light:border-slate-300'
                )}
              >
                <span>{tag}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                    isSelected
                      ? 'bg-primary-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/5 text-slate-400">
          <Layers className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm">No projects matching the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={setActiveModalProject}
            />
          ))}
        </div>
      )}

      {/* Deep-dive detail modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
