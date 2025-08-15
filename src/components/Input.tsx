import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  className = '',
  ...props
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 border-2 rounded-2xl shadow-sm bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white
          focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400
          disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed
          transition-all duration-300 backdrop-blur-sm
          ${error 
            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 dark:border-red-400' 
            : 'border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};