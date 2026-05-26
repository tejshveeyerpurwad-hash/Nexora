import React from 'react';
import { 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  Command, 
  GitBranch, 
  CheckCircle,
  Menu,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ activeTab, toggleMobileSidebar }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md px-6 flex items-center justify-between transition-all duration-300 relative z-10">
      
      {/* Left side: Mobile Menu Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Breadcrumb inspired by Notion/Vercel */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-zinc-400 select-none">
          <span className="hover:text-slate-800 dark:hover:text-zinc-200 cursor-pointer">workspace</span>
          <span>/</span>
          <span className="hover:text-slate-800 dark:hover:text-zinc-200 cursor-pointer">hobby-team-a</span>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white capitalize">{activeTab}</span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Vercel Search bar mockup */}
        <div className="hidden sm:flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 text-xs text-slate-400 dark:text-zinc-500 w-48 lg:w-64 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-all select-none">
          <Search className="w-3.5 h-3.5" />
          <span className="flex-grow text-left">Search console...</span>
          <div className="flex items-center gap-0.5 bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-300 dark:border-white/10 text-[9px] font-bold">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>

        {/* Pipeline / branch indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        {/* Notification Bell */}
        <button className="p-2 rounded-xl border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
        </button>

      </div>
    </header>
  );
}
