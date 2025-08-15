import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-lg w-full space-y-6">
        {/* Logo and Branding */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-4 rounded-2xl shadow-xl transform rotate-3">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 p-1.5 rounded-full">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Wiremit
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg font-medium">
            Lightning-fast global transfers
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
              <Globe className="h-4 w-4 text-teal-500" />
              <span>Global reach</span>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-slate-700/50">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-600 dark:text-slate-400 text-center mt-3 text-lg">
                {subtitle}
              </p>
            )}
          </div>
          
          {children}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-emerald-500" />
              <span>Instant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-teal-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3 text-cyan-500" />
              <span>Trusted</span>
            </div>
          </div>
          <p className="mt-3 text-sm">Empowering Zimbabwean families across borders</p>
        </div>
      </div>
    </div>
  );
};