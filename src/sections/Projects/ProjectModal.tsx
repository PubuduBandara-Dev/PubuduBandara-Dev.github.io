import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Building,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
} from 'lucide-react';
import { GithubIcon } from '../../components/common/BrandIcons';
import type { ProjectItem } from '../../types';
import { Badge } from '../../components/common/Badge';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111827] dark:bg-[#111827] light:bg-white border border-white/10 light:border-slate-300 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Project Type */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="primary" size="sm">
            {project.category}
          </Badge>
          <Badge variant="subtle" size="sm">
            {project.projectType}
          </Badge>
          {project.featured && (
            <Badge variant="accent" size="sm">
              Featured Solution
            </Badge>
          )}
        </div>

        {/* Project Title */}
        <h3
          id="modal-project-title"
          className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight pr-10"
        >
          {project.title}
        </h3>

        {/* Employer & Client Info */}
        <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400 pb-4 border-b border-white/5 light:border-slate-200">
          <div className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-primary-400" />
            <span>Employer: <strong className="text-white dark:text-white light:text-slate-800 font-semibold">{project.employer}</strong></span>
          </div>
          {project.client && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600">•</span>
              <span>Client: <strong className="text-white dark:text-white light:text-slate-800 font-semibold">{project.client}</strong></span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-primary-400 mb-2">
            System Overview
          </h4>
          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Role & Contributions */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-white/5 light:border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 font-semibold mb-2">
            <UserCheck className="w-4 h-4 text-primary-400" />
            <span>My Role & Engineering Contributions</span>
          </div>
          <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
            {project.role}
          </p>
        </div>

        {/* Key Capabilities */}
        {project.keyCapabilities && project.keyCapabilities.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 mb-3">
              Key Capabilities & Architectural Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyCapabilities.map((cap, cIdx) => (
                <div
                  key={cIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operational Note */}
        {project.operationalNote && (
          <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 light:text-amber-700 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{project.operationalNote}</p>
          </div>
        )}

        {/* Technologies */}
        <div className="mt-6 pt-5 border-t border-white/5 light:border-slate-200">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 mb-3">
            Technology Stack & Integrations
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, tIdx) => (
              <Badge key={tIdx} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links Footer if available */}
        {(project.website || project.githubUrl || project.liveDemoUrl) && (
          <div className="mt-6 pt-5 border-t border-white/5 light:border-slate-200 flex flex-wrap gap-3">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors shadow-sm"
              >
                <span>Visit Platform Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
