import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Code2, 
  ArrowLeft 
} from 'lucide-react';

export default function LoginPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const result = await login(email, password);
    setIsLoading(false);
    
    if (result.success) {
      setPage('dashboard');
    } else {
      setErrorMsg(result.error || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text relative flex items-center justify-center p-6 transition-colors duration-300 overflow-hidden">
      
      {/* Mesh Glow Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full glow-spot-blue pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full glow-spot-purple pointer-events-none z-0" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none z-0" />

      {/* Main Card container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 glass rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl relative z-10">
        
        {/* Left Side: Login Form */}
        <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-white/40 dark:bg-zinc-950/40">
          <div>
            {/* Logo */}
            <div 
              onClick={() => setPage('landing')}
              className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-10 cursor-pointer hover:opacity-80 transition-opacity inline-flex"
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="font-sans text-lg tracking-tight">DevFlow AI</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-8">
              Access your DevFlow terminal and restart your agent workflows.
            </p>

            {errorMsg && (
              <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/40 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Password</label>
                  <a href="#" className="text-xs font-semibold text-blue-500 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/40 text-sm transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="remember" className="ml-2.5 text-xs text-slate-600 dark:text-zinc-400 select-none">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
              >
                {isLoading ? (
                  <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Console <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/5" />
              </div>
              <span className="relative px-3 bg-white/10 dark:bg-zinc-950/10 backdrop-blur-sm text-xs text-slate-400 dark:text-zinc-500">
                Or continue with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setPage('dashboard')}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg> Github
              </button>
              <button 
                onClick={() => setPage('dashboard')}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.293 0-5.973-2.68-5.973-5.973s2.68-5.973 5.973-5.973c1.493 0 2.852.552 3.9 1.455l3.09-3.09C18.966 2.923 15.795 1.5 12.24 1.5 5.92 1.5.8 6.62.8 12.94s5.12 11.44 11.44 11.44c6.64 0 11.44-4.66 11.44-11.44 0-.78-.07-1.52-.2-2.24v-4.63h-11.24z"/>
                </svg> Google
              </button>
            </div>
          </div>

          {/* Bottom link */}
          <div className="mt-8 text-center text-xs text-slate-600 dark:text-zinc-400">
            Don't have an account?{' '}
            <button onClick={() => setPage('register')} className="text-blue-500 font-bold hover:underline">
              Create free account
            </button>
          </div>
        </div>

        {/* Right Side: Modern SaaS Showcase panel */}
        <div className="hidden md:col-span-6 bg-gradient-to-br from-slate-900 to-zinc-950 p-12 text-white flex-col justify-between border-l border-white/5 relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute -bottom-1/3 -left-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-500">Preview System</span>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 font-mono">
              <Code2 className="w-3.5 h-3.5 text-blue-400" /> Sandbox Ready
            </div>
          </div>

          {/* Vercel style floating preview code block */}
          <div className="my-10 relative z-10 glass-card bg-zinc-900/60 p-6 rounded-2xl border border-white/5 shadow-2xl font-mono text-xs text-zinc-400 scale-[1.03]">
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <p className="text-zinc-200 mb-2">// Fetching file context mapping...</p>
            <p className="text-blue-400">const<span className="text-white"> index </span>=<span className="text-purple-400"> await</span><span className="text-emerald-400"> searchSemantic</span>(<span className="text-amber-300">"auth flow"</span>);</p>
            <p className="text-zinc-500 mt-2">// Response latency: 12ms</p>
            <p className="text-zinc-500">// Index matched: src/controllers/authController.js</p>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Automate your stack effortlessly</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              DevFlow securely parses semantic files in absolute isolation. All code intelligence remains strictly within your enterprise guardrails.
            </p>
          </div>
        </div>

      </div>

      {/* Floating Back Button */}
      <button 
        onClick={() => setPage('landing')}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl glass border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </button>

    </div>
  );
}
