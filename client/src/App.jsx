import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { Sparkles, Sun, Moon, LayoutDashboard } from 'lucide-react';

function AppContent({ page, setPage }) {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();

  // Route Guarding: Redirect to login if accessing dashboard withoutauth
  const handleNavigateToDashboard = () => {
    if (isAuthenticated) {
      setPage('dashboard');
    } else {
      setPage('login');
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text">
      
      {/* Universal Floating Navigation for immediate UI Demonstration & Prototyping */}
      {page !== 'dashboard' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass px-4 py-2.5 rounded-full border border-slate-200 dark:border-white/10 shadow-xl flex items-center gap-6">
          <div 
            onClick={() => setPage('landing')}
            className="flex items-center gap-1.5 font-extrabold text-xs text-slate-950 dark:text-white cursor-pointer select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>DevFlow AI</span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

          <nav className="flex items-center gap-3.5 text-[11px] font-bold tracking-wide text-slate-500 dark:text-zinc-400">
            <button 
              onClick={() => setPage('landing')}
              className={`hover:text-slate-950 dark:hover:text-white transition-all ${page === 'landing' ? 'text-blue-500 dark:text-blue-400' : ''}`}
            >
              Landing
            </button>
            
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => setPage('login')}
                  className={`hover:text-slate-950 dark:hover:text-white transition-all ${page === 'login' ? 'text-blue-500 dark:text-blue-400' : ''}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setPage('register')}
                  className={`hover:text-slate-950 dark:hover:text-white transition-all ${page === 'register' ? 'text-blue-500 dark:text-blue-400' : ''}`}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button 
                onClick={logout}
                className="hover:text-slate-950 dark:hover:text-white transition-all"
              >
                Sign Out
              </button>
            )}

            <button 
              onClick={handleNavigateToDashboard}
              className={`hover:text-slate-950 dark:hover:text-white transition-all ${page === 'dashboard' ? 'text-blue-500 dark:text-blue-400' : ''} flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-lg text-slate-900 dark:text-white`}
            >
              <LayoutDashboard className="w-3 h-3 text-purple-500" /> Console
            </button>
          </nav>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

          <button 
            onClick={toggleTheme}
            className="p-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-purple-600" />}
          </button>
        </div>
      )}

      {/* Pages Router */}
      {page === 'landing' && <LandingPage setPage={setPage} />}
      {page === 'login' && <LoginPage setPage={setPage} />}
      {page === 'register' && <RegisterPage setPage={setPage} />}
      {page === 'dashboard' && <DashboardPage setPage={setPage} />}

    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('landing');
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent page={page} setPage={setPage} />
      </AuthProvider>
    </ThemeProvider>
  );
}
