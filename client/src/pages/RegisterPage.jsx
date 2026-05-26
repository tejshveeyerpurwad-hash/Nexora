import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Code2, 
  CheckCircle2,
  ArrowLeft 
} from 'lucide-react';

export default function RegisterPage({ setPage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) return;
    setIsLoading(true);
    setErrorMsg('');
    
    const result = await register(fullName, email, password, 'developer');
    setIsLoading(false);
    
    if (result.success) {
      setPage('dashboard');
    } else {
      setErrorMsg(result.error || 'Registration failed');
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
        
        {/* Left Side: Register Form */}
        <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-white/40 dark:bg-zinc-950/40">
          <div>
            {/* Logo */}
            <div 
              onClick={() => setPage('landing')}
              className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-8 cursor-pointer hover:opacity-80 transition-opacity inline-flex"
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="font-sans text-lg tracking-tight">Nexora</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6">
              Get access to the premium developer platform for serverless sandboxes.
            </p>

            {errorMsg && (
              <div className="mb-4 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-semibold leading-relaxed">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/40 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/40 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/40 text-sm transition-all"
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

              {/* Terms Checkbox */}
              <div className="flex items-start py-1">
                <input 
                  type="checkbox" 
                  id="agree" 
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 rounded border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 text-blue-600 focus:ring-0"
                />
                <label htmlFor="agree" className="ml-2.5 text-[11px] text-slate-600 dark:text-zinc-400 select-none leading-relaxed">
                  I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading || !agreeToTerms}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Free Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/5" />
              </div>
              <span className="relative px-3 bg-white/10 dark:bg-zinc-950/10 backdrop-blur-sm text-xs text-slate-400 dark:text-zinc-500">
                Or sign up with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setPage('dashboard')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg> Github
              </button>
              <button 
                onClick={() => setPage('dashboard')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.293 0-5.973-2.68-5.973-5.973s2.68-5.973 5.973-5.973c1.493 0 2.852.552 3.9 1.455l3.09-3.09C18.966 2.923 15.795 1.5 12.24 1.5 5.92 1.5.8 6.62.8 12.94s5.12 11.44 11.44 11.44c6.64 0 11.44-4.66 11.44-11.44 0-.78-.07-1.52-.2-2.24v-4.63h-11.24z"/>
                </svg> Google
              </button>
            </div>
          </div>

          {/* Bottom link */}
          <div className="mt-6 text-center text-xs text-slate-600 dark:text-zinc-400">
            Already have an account?{' '}
            <button onClick={() => setPage('login')} className="text-blue-500 font-bold hover:underline">
              Sign In
            </button>
          </div>
        </div>

        {/* Right Side: Modern SaaS Showcase list */}
        <div className="hidden md:col-span-6 bg-gradient-to-br from-slate-900 to-zinc-950 p-12 text-white flex-col justify-between border-l border-white/5 relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute -bottom-1/3 -left-1/3 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-500">Developer Cloud</span>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 font-mono">
              ⚡ Multi-region
            </div>
          </div>

          {/* Clean bullet features */}
          <div className="my-8 relative z-10 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Unlimited sandbox tests</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Run serverless test sandboxes globally in under 200ms with zero configuration files.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Continuous repo mapping</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Every commit builds a fresh, isolated semantic map of your code definitions automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Secure air-gapped compliance</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Your team's intellectual properties are completely protected under enterprise grade SOC-2 standards.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Designed for elite speed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nexora combines standard Git workflows with deep LLM semantic memory to turn manual code tracking into background noise.
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
