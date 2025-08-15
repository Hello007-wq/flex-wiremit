import React, { useState } from 'react';
import { Zap, User, LogOut, Bell, Settings } from 'lucide-react';
import { User as UserType } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface DashboardHeaderProps {
  user: UserType;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-3 rounded-2xl shadow-lg">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Wiremit
            </span>
          </div>

          {/* Navigation and User Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            
            <ThemeToggle />
            
            {/* User Profile Dropdown */}
            <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 text-sm bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-3 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-md"
            >
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-2.5">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block font-semibold text-slate-700 dark:text-slate-300">
                {user.name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 py-2 z-50">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{user.email}</p>
                </div>
                
                <button className="flex items-center w-full px-5 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <Settings className="h-4 w-4 mr-3" />
                  Account Settings
                </button>
                
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                  className="flex items-center w-full px-5 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-2xl"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};