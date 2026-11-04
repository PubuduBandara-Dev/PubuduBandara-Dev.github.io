import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  onClick,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/60 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700/60 light:bg-slate-100 light:text-slate-800 light:border-slate-300',
    primary: 'bg-primary-500/10 text-primary-400 border border-primary-500/30',
    accent: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    outline: 'bg-transparent text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200',
    subtle: 'bg-slate-800/40 text-slate-400 border border-white/5',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        onClick && 'cursor-pointer hover:opacity-90',
        className
      )}
    >
      {children}
    </span>
  );
};
