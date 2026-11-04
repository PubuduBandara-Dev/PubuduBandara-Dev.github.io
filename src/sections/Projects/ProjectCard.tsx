import React from 'react';
import {
  ExternalLink,
  Building,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../../components/common/BrandIcons';
import type { ProjectItem } from '../../types';
import { Badge } from '../../components/common/Badge';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const isPersonal = project.projectType.toLowerCase().includes('personal');

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-[#111827]/80 dark:bg-[#111827]/80 light:bg-white border border-white/5 light:border-slate-200 shadow-sm hover:border-primary-500/40 light:hover:border-primary-500/40 transition-all duration-300 p-6 sm:p-7 glow-card group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-medium text-primary-400 bg-primary-500/10 px-2.5 py-0.5 rounded-full border border-primary-500/20">
            {project.category}
          </span>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
              isPersonal
                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                : 'bg-slate-800 text-slate-400 border border-white/5'
            }`}
          >
            {project.projectType}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        {/* Employer / Client */}
        <div className="mt-2 text-xs font-mono text-slate-400 flex flex-wrap items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-300 dark:text-slate-300 light:text-slate-600 font-medium">
            {project.employer}
          </span>
          {project.client && (
            <span className="text-slate-500 text-[11px]">
              • Client: {project.client}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3.5 text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Key capabilities preview */}
        {project.keyCapabilities && project.keyCapabilities.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {project.keyCapabilities.slice(0, 2).map((cap, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{cap}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technology Badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <Badge key={idx} variant="subtle" size="sm">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] font-mono text-slate-400 self-center px-1">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-white/5 light:border-slate-200 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors focus-visible:outline-none"
        >
          <span>View Architecture & Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 transition-colors"
              aria-label={`Visit ${project.title} website`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 transition-colors"
              aria-label={`View ${project.title} source code`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
