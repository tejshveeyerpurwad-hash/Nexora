import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Code, 
  Cpu, 
  Layers, 
  Zap, 
  Shield, 
  Activity, 
  Terminal,
  CheckCircle2,
  ChevronRight,
  Database,
  GitBranch,
  Search,
  Globe,
  Settings
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LandingPage({ setPage }) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('agent');

  const tabsContent = {
    agent: {
      title: "Nexora Architect",
      desc: "Our model understands your whole codebase, creates complex multi-file features, and refactors legacy code automatically.",
      code: `// Initializing Nexora Agent
import { DevAgent } from '@nexora/sdk';

const agent = new DevAgent({
  projectRoot: './src',
  model: 'nexora-ultra-v4'
});

// Run a multi-file migration task
await agent.executeTask({
  instruction: "Migrate auth system from session cookies to JWT tokens",
  verifyWithTests: true
});`
    },
    review: {
      title: "AI PR Review & Diagnostics",
      desc: "Pre-empt bugs and security vulnerabilities on every push. Nexora provides actionable code suggestions directly in your pipeline.",
      code: `## Nexora PR Review: #420
### ⚠️ Security Warning (High Severity)
In \`auth.js\`, lines 45-48: Using low-entropy salt.
\`\`\`javascript
- const salt = 'static_salt_123';
+ const salt = await bcrypt.genSalt(12);
\`\`\`
### ⚡ Performance Optimization
In \`db.js\`: Missing compound index for active queries.`
    },
    deploy: {
      title: "Zero-Config Edge Deployments",
      desc: "Deploy serverless backend APIs and globally distributed React apps in one command. Blazing fast edge infrastructure built in.",
      code: `$ nexora deploy --production

🔍 Scanning workspace... (Detected Next.js + Node API)
⚡ Bundling modules for edge computing...
📦 Uploading assets to Nexora Global Edge (32 locations)
✅ Deployment successful!
🔗 URL: https://nexora-app-9ab2c.nexora.app`
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text relative overflow-hidden transition-colors duration-300">
      
      {/* Mesh Gradients / Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full glow-spot-blue pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full glow-spot-purple pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full glow-spot-pink pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* Badge Hero */}
        <div className="flex justify-center mb-6 animate-float">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-slate-200 dark:border-white/10 text-xs font-semibold tracking-wide text-brand-secondary dark:text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Nexora v1.2: Next-gen code intelligence</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-zinc-200 dark:to-zinc-500 mb-6">
            Build applications at the speed of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">thought</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Nexora brings Vercel's developer experience, GitHub Copilot's inline magic, and autonomous multi-file architecture mapping into a single cohesive ecosystem.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={() => setPage('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Go to Console <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setPage('register')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass border border-slate-200 dark:border-white/10 font-medium hover:bg-slate-100 dark:hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Create Free Account
          </button>
        </div>

        {/* Interactive Vercel-style Playground/Console Mockup */}
        <div className="max-w-5xl mx-auto mb-32 glass rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono ml-2">nexora-agent-shell.sh</span>
            </div>
            <div className="flex gap-1.5">
              {Object.keys(tabsContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Mode
                </button>
              ))}
            </div>
          </div>
          {/* Content area */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 bg-white/20 dark:bg-zinc-950/20">
              <div>
                <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase">
                  Feature Highlight
                </span>
                <h3 className="text-2xl font-bold mt-4 mb-3 text-slate-950 dark:text-white">
                  {tabsContent[activeTab].title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {tabsContent[activeTab].desc}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-white/5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Real-time semantic search indexing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Multi-file dependency mapping</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Integrated zero-config sandbox execution</span>
                </div>
              </div>
            </div>
            
            {/* Code Block Vercel/Notion Style */}
            <div className="md:col-span-7 p-6 bg-slate-950 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto min-h-[320px] flex items-center">
              <pre className="w-full text-left leading-relaxed">
                <code>{tabsContent[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Feature Grid (Modern Cards & Glassmorphism) */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Everything you need to ship in minutes
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base">
              A comprehensive toolbelt tailored specifically for engineering teams that refuse to move slowly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Code Autocomplete</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                Next-token prediction using hyper-targeted models optimized specifically on your organization's design systems and SDKs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Autonomous Agent Workflows</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                Kick off complex multi-file engineering tasks, database migrations, and structural refactorings with natural language instructions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Workspace Semantics</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                Nexora maps every module, interface, and configuration, feeding precise, up-to-date architecture logic directly to the LLM.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sub-Second Edge Infrastructure</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                Instant testing, serverless databases, edge function packaging, and global distribution. Deploying has never been so seamless.
              </p>
            </div>

            {/* Card 5 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Bank-Grade Compliance</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                SOC-2, HIPAA ready, and air-gapped deployments. Your proprietary code never gets leaked or used to train open models.
              </p>
            </div>

            {/* Card 6 */}
            <div className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Observability built-in</h4>
              <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                Track token cost, AI usage patterns, performance gains, error rates, and team velocity metrics inside unified dashboard reports.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Segment */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Flexible pricing for developers and teams
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm md:text-base">
              Start completely free, scale as your team and compute demands grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-white/5 relative">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-zinc-400">Hobbyist</span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-slate-950 dark:text-white">$0</span>
                  <span className="text-slate-500 dark:text-zinc-400 text-sm">/ forever</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">Perfect to test out code autocomplete and sandbox environments.</p>
                <div className="space-y-3.5 border-t border-slate-200 dark:border-white/5 pt-6">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>200 AI autocomplete credits/mo</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Basic single-file mapping</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Nexora Deploy (1 project)</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setPage('register')}
                className="mt-8 w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold transition-all"
              >
                Sign Up Free
              </button>
            </div>

            {/* Pro Plan (Vercel style highlighted) */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border-2 border-blue-500/80 relative shadow-xl shadow-blue-500/5">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                Most Popular
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-500">Professional</span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-slate-950 dark:text-white">$29</span>
                  <span className="text-slate-500 dark:text-zinc-400 text-sm">/ seat / mo</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">Designed to optimize productivity and accelerate shipping speed for startups.</p>
                <div className="space-y-3.5 border-t border-blue-500/20 pt-6">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium text-slate-900 dark:text-white">Unlimited autocomplete credits</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Autonomous multi-file repository indexing</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Nexora Deploy (Unlimited)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Advanced team dashboards & insights</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setPage('dashboard')}
                className="mt-8 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white text-xs font-semibold shadow-md transition-all"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-white/5 relative">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-zinc-400">Enterprise</span>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-slate-950 dark:text-white">Custom</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">Built specifically for large engineering organizations demanding isolation.</p>
                <div className="space-y-3.5 border-t border-slate-200 dark:border-white/5 pt-6">
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium text-slate-900 dark:text-white">Self-hosted / On-Premise VPC</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Custom model training on organization code</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Dedicated support & 99.99% uptime SLA</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-12 text-center text-xs text-slate-500 dark:text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Nexora</span>
          </div>
          <div>© {new Date().getFullYear()} Nexora Inc. All rights reserved. Built with Vercel design principles.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-800 dark:hover:text-white">Security</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white">Terms of Use</a>
          </div>
        </div>

      </div>
    </div>
  );
}
