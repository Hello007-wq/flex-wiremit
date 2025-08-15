import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { authService } from './utils/auth';
import { LoadingSpinner } from './components/LoadingSpinner';

type AppState = 'loading' | 'login' | 'register' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (authService.isAuthenticated()) {
        setAppState('dashboard');
      } else {
        setAppState('login');
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setAppState('dashboard');
  };

  const handleRegister = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setAppState('login');
  };

  if (appState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 rounded-3xl shadow-2xl mx-auto w-20 h-20 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-full animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Wiremit
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Preparing your financial gateway...</p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setAppState('register')}
      />
    );
  }

  if (appState === 'register') {
    return (
      <Register 
        onRegister={handleRegister}
        onSwitchToLogin={() => setAppState('login')}
      />
    );
  }

  return (
    <Dashboard onLogout={handleLogout} />
  );
}

export default App;