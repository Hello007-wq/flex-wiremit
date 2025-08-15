import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { authService } from '../utils/auth';
import { fxRatesService } from '../utils/fxRates';
import { SendMoney } from './SendMoney';
import { AdvertisementCarousel } from './AdvertisementCarousel';
import { TransactionHistory } from './TransactionHistory';
import { DashboardHeader } from './DashboardHeader';
import { LoadingSpinner } from './LoadingSpinner';
import { FXRate } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [fxRates, setFxRates] = useState<FXRate | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [user] = useState(() => authService.getCurrentUser());

  useEffect(() => {
    const loadFxRates = async () => {
      try {
        setIsLoadingRates(true);
        setRatesError(null);
        const rates = await fxRatesService.getRates();
        setFxRates(rates);
      } catch (error) {
        console.error('Error loading FX rates:', error);
        setRatesError('Failed to load exchange rates');
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadFxRates();
    
    // Refresh rates every 5 minutes
    const interval = setInterval(loadFxRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    onLogout();
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 transition-colors duration-300">
      <DashboardHeader user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        {/* Welcome Message */}
        <div className="mb-10">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{user.name}</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Ready to send money across borders? Let's make it happen.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">2,450</div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Total sent this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FX Rates Loading/Error State */}
        {isLoadingRates && (
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8 mb-8">
            <div className="flex items-center justify-center">
              <LoadingSpinner size="md" />
              <span className="ml-4 text-slate-600 dark:text-slate-400 font-medium">Loading live exchange rates...</span>
            </div>
          </div>
        )}

        {ratesError && (
          <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-xl border border-amber-200/50 dark:border-amber-800/50 rounded-3xl p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-amber-500 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                  Exchange rates unavailable
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Using cached rates. Some rates may not be current.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Send Money Section */}
          <div className="xl:col-span-3">
            <SendMoney 
              fxRates={fxRates} 
              isLoadingRates={isLoadingRates}
              userId={user.id}
            />
          </div>

          {/* Advertisement Section */}
          <div className="xl:col-span-1">
            <AdvertisementCarousel />
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-12">
          <TransactionHistory userId={user.id} />
        </div>
      </main>
    </div>
  );
};