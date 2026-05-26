import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  LayoutDashboard, 
  Terminal, 
  GitBranch, 
  Compass, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  ChevronRight,
  Database,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, setPage }) {
  const { user, logout } = useAuth();
  
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'agent', name: 'AI Agent Console', icon: Terminal, badge: 'Active' },
    { id: 'repo', name: 'Repository Map', icon: GitBranch },
    { id: 'deployments', name: 'Deployments', icon: Compass },
    { id: 'analytics', name: 'Usage & Billing', icon: BarChart3 },
    { id: 'settings', name: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-slate-200 dark:border-white/5 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md flex flex-col justify-between p-4 flex-shrink-0 transition-all duration-300 z-20">
      <div>
        {/* Brand Logo */}
        <div 
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 px-3 py-3 mb-6 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <Sparkles className="w-5.5 h-5.5 text-blue-500 animate-float" />
          <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">DevFlow AI</span>
        </div>

        {/* Workspace Switcher */}
        <div className="mb-6 px-1">
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold">
                DF
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">DevFlow Workspace</p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400">hobby-team-a</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive 
                    ? 'bg-slate-200/60 dark:bg-white/10 text-slate-950 dark:text-white shadow-sm' 
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400 dark:text-zinc-500'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / Profile Info */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-4">
        {/* Connection status indicator */}
        <div className="flex items-center gap-2 px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 tracking-wider uppercase">Sandbox Connected</span>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-700 dark:text-zinc-300">
              {user && user.name 
                ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
                : 'DF'}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {user ? user.name : 'Developer'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 leading-none">
                {user ? user.email : 'dev@devflow.ai'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              logout();
              setPage('landing');
            }}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
