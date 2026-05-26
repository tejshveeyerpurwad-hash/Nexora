import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  Terminal, 
  Activity, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Play,
  RotateCcw,
  Plus,
  GitBranch,
  ArrowRight,
  Code,
  FileCode2,
  Trash2,
  Sliders,
  Database,
  BarChart3
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function DashboardPage({ setPage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, token, logout, setUser } = useAuth();
  
  // Real DB tasks history list
  const [dbTasks, setDbTasks] = useState([]);
  
  // Interactive Mock AI console state
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, type: 'info', text: 'DevFlow engine v1.2 initialized successfully.', time: '14:20:10' },
    { id: 2, type: 'info', text: 'Watching workspace repository: /hobby-team-a/devflow-app...', time: '14:20:11' },
    { id: 3, type: 'success', text: 'Semantic map updated: 24 modules indexed successfully.', time: '14:20:15' }
  ]);
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentProgress, setAgentProgress] = useState(100);
  const [taskInput, setTaskInput] = useState('');

  // Mock code generated states
  const [mockEditorCode, setMockEditorCode] = useState(`// DevFlow Sandboxed Code Editor\n// Select or run an AI Agent task to populate this space.`);

  const createGuestTask = (instruction) => ({
    _id: `guest-${Date.now().toString(36)}`,
    title: instruction,
    status: 'ready',
    createdAt: new Date().toISOString(),
  });

  // Load user's tasks from MongoDB
  const fetchTasks = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDbTasks(data);
      }
    } catch (err) {
      console.error('Failed to sync tasks with MongoDB:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleNewDeployment = async () => {
    const defaultInstruction = 'Deploy current workspace changes as a new edge deployment';
    await runMockAgentTask(defaultInstruction);
  };

  const highlightCode = (code) => {
    if (!code) return '';
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Highlight comments
    escaped = escaped.replace(/(\/\/.*)/g, '<span class="text-zinc-500 font-normal">$1</span>');
    
    // Highlight keywords
    const keywords = /\b(const|let|var|function|return|export|import|from|async|await|try|catch|if|else|new|throw|class)\b/g;
    escaped = escaped.replace(keywords, '<span class="text-blue-400 font-bold">$1</span>');

    // Highlight strings
    escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="text-emerald-400 font-semibold">"$2"</span>');

    // Highlight numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="text-amber-400 font-mono">$1</span>');

    // Highlight classes
    const classes = /\b(User|Task|Schema|Response|Request|db|mongoose|express|jwt|bcrypt|Product|stripe|Stripe|event)\b/g;
    escaped = escaped.replace(classes, '<span class="text-purple-400 font-semibold">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: escaped }} />;
  };

  const runMockAgentTask = async (instructionOverride) => {
    const runInput = instructionOverride?.trim() || taskInput.trim();
    if (!runInput) return;

    const isGuest = !token;
    if (user && user.credits < 100) {
      alert('Insufficient compute credits! Please upgrade your plan.');
      return;
    }

    setIsAgentRunning(true);
    setAgentProgress(15);
    const timeNow = () => new Date().toLocaleTimeString();

    setAgentLogs(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'info',
        text: isGuest
          ? `Running guest deployment demo: "${runInput}"`
          : `Triggering MongoDB task request for: "${runInput}"`,
        time: timeNow()
      }
    ]);

    const finalizeSuccess = (task, generatedCode) => {
      setAgentProgress(100);
      setIsAgentRunning(false);
      setAgentLogs(prev => [
        ...prev,
        { id: Date.now() + 4, type: 'success', text: 'Success! Multi-file write completed, pipeline green. Ready to push.', time: timeNow() }
      ]);
      if (!instructionOverride) {
        setTaskInput('');
      }
      setDbTasks(prev => [task, ...prev]);
      if (!isGuest) fetchTasks();
      setMockEditorCode(generatedCode || `// Done compiling: "${runInput}"`);
    };

    try {
      if (isGuest) {
        const guestTask = createGuestTask(runInput);
        setTimeout(() => {
          setAgentProgress(45);
          setAgentLogs(prev => [
            ...prev,
            { id: Date.now() + 2, type: 'info', text: 'Generating a local demo task manager for guest users...', time: timeNow() }
          ]);
        }, 1000);

        setTimeout(() => {
          setAgentProgress(75);
          setAgentLogs(prev => [
            ...prev,
            { id: Date.now() + 3, type: 'success', text: 'Guest deployment completed locally. Sign in to persist deployments.', time: timeNow() }
          ]);
          finalizeSuccess(guestTask, `// Guest deployment completed for: "${runInput}"`);
        }, 2200);
        return;
      }

      // POST request to trigger a real task in MongoDB and deduct credits
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: runInput,
          description: 'DevFlow Terminal Agent Compilation'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prev => ({ ...prev, credits: prev.credits - 100 }));

        setTimeout(() => {
          setAgentProgress(45);
          setAgentLogs(prev => [
            ...prev,
            { id: Date.now() + 2, type: 'info', text: 'Analyzing file dependencies... (Connecting to MongoDB cluster)', time: timeNow() }
          ]);
        }, 1000);

        setTimeout(() => {
          setAgentProgress(75);
          setAgentLogs(prev => [
            ...prev,
            { id: Date.now() + 3, type: 'success', text: 'Executing test suite... Mapped definitions stored successfully in MongoDB.', time: timeNow() }
          ]);
        }, 2200);

        setTimeout(() => {
          finalizeSuccess(data, data.generatedCode || `// Done compiling: "${runInput}"`);
        }, 3200);
      } else {
        setIsAgentRunning(false);
        setAgentLogs(prev => [
          ...prev,
          { id: Date.now() + 5, type: 'error', text: `API Engine Error: ${data.error}`, time: timeNow() }
        ]);
      }
    } catch (err) {
      setIsAgentRunning(false);
      setAgentLogs(prev => [
        ...prev,
        { id: Date.now() + 6, type: 'error', text: 'Failed to communicate with AI Backend engine. Server connection lost.', time: timeNow() }
      ]);
    }
  };

  const clearLogs = () => {
    setAgentLogs([
      { id: 1, type: 'info', text: 'Logs cleared. Ready for next agent instructions.', time: new Date().toLocaleTimeString() }
    ]);
    setMockEditorCode('// DevFlow Sandboxed Code Editor\n// Select or run an AI Agent task to populate this space.');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text overflow-hidden transition-colors duration-300">
      
      {/* Mobile Sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 transition-all duration-300"
        />
      )}

      {/* Sidebar container */}
      <div className={`fixed md:relative top-0 bottom-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }} 
          setPage={setPage}
        />
      </div>

      {/* Main Workspace container */}
      <div className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <Navbar 
          activeTab={activeTab} 
          toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
        />

        {/* Inner page content wrapper */}
        <main className="flex-grow p-6 relative max-w-[1600px] w-full mx-auto">
          
          {/* Subtle decoration elements */}
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full glow-spot-blue pointer-events-none z-0" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full glow-spot-purple pointer-events-none z-0" />

          <div className="relative z-10">

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Header Welcome banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                  <div className="text-left">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Global Overview</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mt-1 text-slate-900 dark:text-white">Workspace Health Dashboard</h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Repository index synchronized with 24 active code modules.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('agent')}
                    className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Terminal className="w-3.5 h-3.5" /> Initialize AI Agent
                  </button>
                </div>

                {/* Key Cards Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:scale-[1.01] transition-all">
                    <div className="flex justify-between items-start text-slate-500 dark:text-zinc-400">
                      <span className="text-xs font-bold uppercase tracking-wider">Sync State</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">Optimal</p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1 font-mono">Last updated: 3 mins ago</p>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:scale-[1.01] transition-all">
                    <div className="flex justify-between items-start text-slate-500 dark:text-zinc-400">
                      <span className="text-xs font-bold uppercase tracking-wider">Compute Credits</span>
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
                      {user ? user.credits.toLocaleString() : '10,000'}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1 font-mono">100 credits deducted per task compilation</p>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:scale-[1.01] transition-all">
                    <div className="flex justify-between items-start text-slate-500 dark:text-zinc-400">
                      <span className="text-xs font-bold uppercase tracking-wider">AI Review Status</span>
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">4 Pipelines</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">✓ 100% test passing score</p>
                  </div>

                  {/* Card 4 */}
                  <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-white/5 hover:scale-[1.01] transition-all">
                    <div className="flex justify-between items-start text-slate-500 dark:text-zinc-400">
                      <span className="text-xs font-bold uppercase tracking-wider">Global Edge Latency</span>
                      <Layers className="w-4 h-4 text-pink-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">12 ms</p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1 font-mono">DevFlow Global Edge (US-East)</p>
                  </div>
                </div>

                {/* Split Panel: Live Console & Code preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Quick Agent Playground */}
                  <div className="lg:col-span-7 glass rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-lg">
                    {/* Console Header */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-mono font-bold">devflow-agent-stream.io</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={clearLogs}
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-[10px] font-mono font-bold transition-all text-slate-600 dark:text-zinc-300"
                        >
                          Clear Logs
                        </button>
                      </div>
                    </div>

                    {/* Console Output */}
                    <div className="p-4 bg-slate-950 font-mono text-[11px] leading-relaxed text-zinc-300 min-h-[220px] max-h-[300px] overflow-y-auto text-left flex-grow">
                      {agentLogs.map((log) => (
                        <div key={log.id} className="mb-2 flex items-start gap-2.5">
                          <span className="text-zinc-600 select-none">[{log.time}]</span>
                          {log.type === 'success' ? (
                            <span className="text-emerald-400 font-bold">✓ SUCCESS:</span>
                          ) : (
                            <span className="text-blue-400 font-bold">ℹ SYSTEM:</span>
                          )}
                          <span>{log.text}</span>
                        </div>
                      ))}
                      {isAgentRunning && (
                        <div className="flex items-center gap-2 text-blue-400 mt-2 animate-pulse">
                          <span>⏱ Running DevFlow model agent processes...</span>
                        </div>
                      )}
                    </div>

                    {/* Task Input bar */}
                    <div className="p-3 border-t border-slate-200 dark:border-white/5 bg-slate-100/55 dark:bg-zinc-950/20 flex gap-2">
                      <input 
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Write dynamic user registration controller in JWT..."
                        className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs transition-all"
                      />
                      <button 
                        onClick={() => runMockAgentTask()}
                        disabled={isAgentRunning || !taskInput.trim()}
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" /> Execute
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Code Sandbox Editor Mock */}
                  <div className="lg:col-span-5 glass rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col shadow-lg">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-mono font-bold">src/controllers/auth.js</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-[9px] font-bold text-purple-500 font-mono tracking-widest uppercase">
                        JavaScript
                      </span>
                    </div>

                    {/* Code Editor */}
                    <div className="p-4 bg-slate-950 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-x-auto min-h-[300px] flex-grow text-left flex items-start">
                      <pre className="w-full">
                        <code>{highlightCode(mockEditorCode)}</code>
                      </pre>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB: AGENT */}
            {activeTab === 'agent' && (
              <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                <div className="text-left max-w-2xl">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-purple-500" /> AI Agent Console
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Ask DevFlow AI to perform multi-file operations, clean code debts, write comprehensive test cases, or inspect structural dependencies.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                  {/* Left Controls */}
                  <div className="lg:col-span-4 space-y-5 text-left">
                    <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" /> Agent Parameters
                      </h4>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Inference Model</label>
                        <select className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 focus:outline-none text-xs transition-all">
                          <option>devflow-ultra-v4 (Recommended)</option>
                          <option>devflow-fast-v2</option>
                          <option>gpt-4o-code-specialist</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Temperature</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          defaultValue="20"
                          className="w-full accent-blue-500 h-1 bg-slate-200 rounded"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                          <span>Precise (0.2)</span>
                          <span>Creative (1.0)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-semibold">Verify with unit tests</span>
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-4 h-4 rounded border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 text-blue-600 focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Chat and Generation */}
                  <div className="lg:col-span-8 glass rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col justify-between shadow-lg">
                    <div className="px-4 py-3.5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-zinc-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-purple-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold">devflow-autonomous-terminal.io</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[9px] font-bold text-emerald-500 font-mono uppercase tracking-widest">
                        Idle
                      </span>
                    </div>

                    <div className="p-6 bg-slate-950 font-mono text-xs text-zinc-300 min-h-[350px] flex items-center justify-center text-center">
                      <div className="max-w-md space-y-4">
                        <Sparkles className="w-8 h-8 text-purple-400 mx-auto animate-float" />
                        <h4 className="text-sm font-bold text-white">Trigger an Autonomous Agent Task</h4>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          Enter your project instructions in the input bar below. DevFlow AI will automatically map directories, design refactors, and execute tests.
                        </p>
                      </div>
                    </div>

                    {/* Interactive Input Bar */}
                    <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-100/55 dark:bg-zinc-950/20 flex gap-3">
                      <input 
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="e.g., 'Migrate API key controllers to dynamic ENV config files'"
                        className="flex-grow px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs transition-all shadow-inner"
                      />
                      <button 
                        onClick={runMockAgentTask}
                        disabled={isAgentRunning || !taskInput.trim()}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-purple-500/15"
                      >
                        <Play className="w-3.5 h-3.5" /> Execute Agent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REPO MAP */}
            {activeTab === 'repo' && (
              <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <GitBranch className="w-6 h-6 text-blue-500" /> Repository Map
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Semantic visualization of file systems, model directories, routes, and controllers. Built with instant context discovery.
                  </p>
                </div>

                {/* Directory visualization list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
                  <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-4">Frontend Directory Structure</h4>
                    <div className="font-mono text-xs space-y-2">
                      <div className="text-blue-500">📁 client</div>
                      <div className="pl-4 text-blue-400">📁 src</div>
                      <div className="pl-8 text-blue-400">📁 components</div>
                      <div className="pl-12 text-zinc-500">📄 Navbar.jsx <span className="text-[10px] text-zinc-400">(4.2KB)</span></div>
                      <div className="pl-12 text-zinc-500">📄 Sidebar.jsx <span className="text-[10px] text-zinc-400">(3.8KB)</span></div>
                      <div className="pl-8 text-blue-400">📁 pages</div>
                      <div className="pl-12 text-zinc-500">📄 LandingPage.jsx</div>
                      <div className="pl-12 text-zinc-500">📄 LoginPage.jsx</div>
                      <div className="pl-12 text-zinc-500">📄 RegisterPage.jsx</div>
                      <div className="pl-12 text-zinc-500">📄 DashboardPage.jsx</div>
                      <div className="pl-8 text-blue-400">📁 context</div>
                      <div className="pl-12 text-zinc-500">📄 ThemeContext.jsx</div>
                      <div className="pl-4 text-zinc-500">📄 tailwind.config.js</div>
                      <div className="pl-4 text-zinc-500">📄 index.html</div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-4">Backend Directory Structure</h4>
                    <div className="font-mono text-xs space-y-2">
                      <div className="text-purple-500">📁 server</div>
                      <div className="pl-4 text-zinc-500">📄 server.js <span className="text-[10px] text-zinc-400">(API Entrypoint)</span></div>
                      <div className="pl-4 text-purple-400">📁 config</div>
                      <div className="pl-8 text-zinc-500">📄 db.js <span className="text-[10px] text-zinc-400">(MongoDB Connection)</span></div>
                      <div className="pl-4 text-purple-400">📁 models</div>
                      <div className="pl-8 text-zinc-500">📄 User.js <span className="text-[10px] text-zinc-400">(Mongoose Schema)</span></div>
                      <div className="pl-8 text-zinc-500">📄 Task.js</div>
                      <div className="pl-4 text-purple-400">📁 routes</div>
                      <div className="pl-8 text-zinc-500">📄 auth.js</div>
                      <div className="pl-8 text-zinc-500">📄 tasks.js</div>
                      <div className="pl-4 text-purple-400">📁 controllers</div>
                      <div className="pl-8 text-zinc-500">📄 authController.js</div>
                      <div className="pl-8 text-zinc-500">📄 taskController.js</div>
                      <div className="pl-4 text-purple-400">📁 middleware</div>
                      <div className="pl-8 text-zinc-500">📄 authMiddleware.js</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DEPLOYMENTS */}
            {activeTab === 'deployments' && (
              <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                <div className="text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-6 h-6 text-pink-500" /> Deployments Console
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      Blazing fast deployments hosted on DevFlow serverless edge globally. Connected with Git hooks.
                    </p>
                  </div>
                  <button
                    onClick={handleNewDeployment}
                    disabled={isAgentRunning}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" /> New Deployment
                  </button>
                </div>

                {!token && (
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-50/80 dark:bg-amber-950/10 dark:border-amber-500/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
                    You are in guest demo mode. New deployments are created locally for preview only. Sign in to save deployments permanently and sync with the backend.
                  </div>
                )}

                <div className="pt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400">
                        <th className="pb-3 font-semibold">Deployment ID</th>
                        <th className="pb-3 font-semibold">Commit Message</th>
                        <th className="pb-3 font-semibold">Branch</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                      {dbTasks.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-slate-500 dark:text-zinc-500 font-semibold">
                            No deployments triggered yet. Initialize an AI agent task to see your serverless edge compilations.
                          </td>
                        </tr>
                      ) : (
                        dbTasks.map((task) => (
                          <tr key={task._id} className="hover:bg-slate-100/50 dark:hover:bg-white/5">
                            <td className="py-4 font-mono font-bold text-blue-500">df-edge-{task._id.substring(18)}</td>
                            <td className="py-4 text-slate-900 dark:text-zinc-200 font-medium">{task.title}</td>
                            <td className="py-4 font-mono text-zinc-500">main</td>
                            <td className="py-4">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold uppercase tracking-wider text-[9px]">
                                {task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : 'Ready'}
                              </span>
                            </td>
                            <td className="py-4 text-slate-500">
                              {new Date(task.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-500" /> Usage & Billing
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Keep track of model token consumption, sandbox CPU execution time, and global serverless bandwidth metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                  <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/5">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Compute Credits</h4>
                    <p className="text-3xl font-extrabold mt-2">
                      {user ? user.credits.toLocaleString() : '10,000'} / 10,000
                    </p>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" 
                        style={{ width: `${user ? (user.credits / 10000) * 100 : 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/5">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Sandbox CPU Hours</h4>
                    <p className="text-3xl font-extrabold mt-2">2.4 / 10 hrs</p>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
                      <div className="w-[24%] h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                  </div>

                  <div className="glass p-5 rounded-2xl border border-slate-200 dark:border-white/5">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Edge Bandwidth</h4>
                    <p className="text-3xl font-extrabold mt-2">128MB / 10GB</p>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
                      <div className="w-[2%] h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/5 space-y-6">
                <div className="text-left">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-6 h-6 text-slate-600 dark:text-zinc-300" /> System Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Configure your repository access credentials, edit notification triggers, or delete team sandboxes.
                  </p>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-white/5 text-left text-xs pt-4">
                  <div className="py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-slate-950 dark:text-white">Workspace Repository Access</h4>
                      <p className="text-slate-500 dark:text-zinc-400 mt-0.5">Let DevFlow auto sync branches and code definitions.</p>
                    </div>
                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 font-bold transition-all flex items-center gap-1.5">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg> Manage Github Hook
                    </button>
                  </div>

                  <div className="py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-slate-950 dark:text-white">Database Integrations</h4>
                      <p className="text-slate-500 dark:text-zinc-400 mt-0.5">Enable direct mock pipeline executions on databases.</p>
                    </div>
                    <button className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 font-bold transition-all flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-purple-500" /> Manage Integrations
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
}
