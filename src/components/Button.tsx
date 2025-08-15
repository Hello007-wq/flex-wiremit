import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    font-medium rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white 
      hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700
      focus:ring-emerald-500/50 active:scale-95 shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-gradient-to-r from-orange-500 to-red-500 text-white 
      hover:from-orange-600 hover:to-red-600
      focus:ring-orange-500/50 active:scale-95 shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
      hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-emerald-500/50 active:scale-95
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-2xl font-semibold'
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};