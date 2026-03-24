import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { soundService, type SoundName } from '../services/soundService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  sound?: SoundName;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  sound = 'click' as SoundName,
  onClick,
  children, 
  ...props 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundService.play(sound as SoundName);
    if (onClick) onClick(e);
  };

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-kactus-green hover:bg-kactus-green/10'
  };

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, onKeyDown, ...props }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundService.play('tap');
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-kactus-dark/70 dark:text-kactus-text-dark/70 ml-1">{label}</label>}
      <input
        className={cn(
          'input-field',
          error && 'border-red-500 focus:ring-red-500/20',
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
};
