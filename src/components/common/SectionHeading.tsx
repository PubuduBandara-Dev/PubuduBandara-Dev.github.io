import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-primary-400 bg-primary-500/10 border border-primary-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
