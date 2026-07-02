import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, Pause, MoreVertical, Flame, CheckSquare, Clock, Plus, Edit2, X, Check } from 'lucide-react';
import { Task, UserStats } from '../types';

export default function TimerTab() {
  const [mode, setMode] = useState<'study' | 'short' | 'long'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  
  // Stats
  const [stats, setStats] = useState<UserStats>({
    sessionsCompleted: 6,
    sessionsGoal: 8,
    focusHours: 2.5,
    focusHoursGoal: 6,
    dailyPercent: 75
  });

  // Active Task
  const [activeTask, setActiveTask] = useState<Task>({
    id: 't1',
    title: 'Advanced Thermodynamics Chapter 4',
    description: 'Focused on entropy calculations and heat transfer models.',
    category: 'Exam Prep',
    priority: 'Priority 1'
  });

  // Edit Task State
  const [editTitle, setEditTitle] = useState(activeTask.title);
  const [editDesc, setEditDesc] = useState(activeTask.description);
  const [editCategory, setEditCategory] = useState(activeTask.category);
  const [editPriority, setEditPriority] = useState(activeTask.priority);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleTimerComplete = () => {
    // Increment sessions & focus hours
    alert('Time is up! Great focus session.');
    
    setStats(prev => {
      const isStudy = mode === 'study';
      const addedSessions = isStudy ? 1 : 0;
      const addedHours = isStudy ? Math.round((initialTime / 3600) * 10) / 10 : 0;
      
      const newSessions = Math.min(prev.sessionsCompleted + addedSessions, prev.sessionsGoal);
      const newHours = Math.round((prev.focusHours + addedHours) * 10) / 10;
      const newPercent = Math.round((newHours / prev.focusHoursGoal) * 100);

      return {
        ...prev,
        sessionsCompleted: newSessions,
        focusHours: newHours,
        dailyPercent: Math.min(newPercent, 100)
      };
    });
    
    // Reset to current mode time
    resetTimer();
  };

  const handleModeChange = (newMode: 'study' | 'short' | 'long') => {
    setIsRunning(false);
    setMode(newMode);
    
    let duration = 25 * 60;
    if (newMode === 'short') duration = 5 * 60;
    if (newMode === 'long') duration = 15 * 60;
    
    setTimeLeft(duration);
    setInitialTime(duration);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    let duration = 25 * 60;
    if (mode === 'short') duration = 5 * 60;
    if (mode === 'long') duration = 15 * 60;
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTask({
      id: 't1',
      title: editTitle,
      description: editDesc,
      category: editCategory,
      priority: editPriority
    });
    setShowTaskModal(false);
  };

  const getSessionLabel = () => {
    if (mode === 'study') return 'Deep Focus';
    if (mode === 'short') return 'Short Break';
    return 'Extended Rest';
  };

  // Circ Dasharray calculation
  const circumference = 2 * Math.PI * 70; // approx 440
  const progressOffset = circumference - (timeLeft / initialTime) * circumference;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Central Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Core Pomodoro Circle Card */}
        <section className="md:col-span-8 bg-white/70 dark:bg-inverse-surface/30 backdrop-blur-md border border-outline-variant/40 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
          
          {/* Mode Switchers */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-8 relative z-10">
            <button 
              onClick={() => handleModeChange('study')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border-2 cursor-pointer ${
                mode === 'study' 
                  ? 'border-primary bg-primary text-white shadow-sm' 
                  : 'border-outline-variant/30 text-on-surface-variant hover:bg-white/50'
              }`}
            >
              Study
            </button>
            <button 
              onClick={() => handleModeChange('short')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border-2 cursor-pointer ${
                mode === 'short' 
                  ? 'border-primary bg-primary text-white shadow-sm' 
                  : 'border-outline-variant/30 text-on-surface-variant hover:bg-white/50'
              }`}
            >
              Short Break
            </button>
            <button 
              onClick={() => handleModeChange('long')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border-2 cursor-pointer ${
                mode === 'long' 
                  ? 'border-primary bg-primary text-white shadow-sm' 
                  : 'border-outline-variant/30 text-on-surface-variant hover:bg-white/50'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* Countdown timer ring display */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-8">
            <svg className="w-full h-full drop-shadow-sm">
              <circle 
                className="stroke-surface-variant/40 fill-none" 
                cx="50%" 
                cy="50%" 
                r="44%" 
                strokeWidth="6" 
              />
              <circle 
                className="stroke-primary timer-progress-ring fill-none transition-all" 
                cx="50%" 
                cy="50%" 
                r="44%" 
                strokeWidth="6" 
                strokeDasharray={440}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`font-mono text-5xl md:text-6xl font-bold tracking-tighter ${timeLeft < (initialTime * 0.1) ? 'text-error animate-pulse' : 'text-primary'}`}>
                {formatTime(timeLeft)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-2">
                {getSessionLabel()}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 relative z-10">
            <button 
              onClick={resetTimer}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant bg-white/40 hover:bg-white/80 transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button 
              onClick={toggleTimer}
              className="px-10 py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-md shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            
            <button 
              onClick={() => alert('Options: Customize timings in settings bar')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant bg-white/40 hover:bg-white/80 transition-colors cursor-pointer"
              title="Options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Side Stats */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Daily Stats Card */}
          <article className="bg-white/70 dark:bg-inverse-surface/30 backdrop-blur-md border border-outline-variant/50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-md font-bold text-primary">Daily Stats</h3>
                <p className="text-xs text-on-surface-variant">Your momentum today</p>
              </div>
              <Flame className="h-5 w-5 text-amber-500 fill-amber-400" />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary border border-primary-container/10">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">Sessions</p>
                  <p className="text-md font-bold text-on-surface">{stats.sessionsCompleted} / {stats.sessionsGoal}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary border border-outline-variant/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">Focus Hours</p>
                  <p className="text-md font-bold text-on-surface">{stats.focusHours}h / {stats.focusHoursGoal}h</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/10 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-on-surface-variant">Daily Goal</span>
                <span className="text-primary">{stats.dailyPercent}%</span>
              </div>
              <div className="h-2 w-full bg-surface-variant/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary rounded-full transition-all duration-1000" 
                  style={{ width: `${stats.dailyPercent}%` }}
                ></div>
              </div>
            </div>
          </article>

          {/* Robert Collier Quote card */}
          <article className="relative rounded-2xl p-5 overflow-hidden bg-primary text-white shadow-sm h-full flex flex-col justify-end min-h-[180px] group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAn66gRFtjgEHPnCwxqrgBOaVWvdiSwJUHcP0gqvYeJtSnWXUxEq0YPHKqKgAkTk1lJM3DYZO7p7lc_4nAwYcV10JiGkFGgVZ43eBfFtuXaev6XqtvgEVTuNW-gHEj6sNaM8oAjVJOrwOUGCI59j8iyAmhZunwCuQ4UGBGrxWyI3Roc4ZPVdXdXtCRqOjMMdCZuanMqB5-jetEDesGmWcx83lelRKaCtNZ-yk2lo6qHXkeEGS4A-iQZS-wbtKn3VMD0TU-TvhcfPbo')`,
                opacity: 0.35
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/35 to-transparent"></div>
            
            <div className="relative z-10 space-y-2">
              <p className="text-sm italic font-medium leading-relaxed">
                &ldquo;Success is the sum of small efforts, repeated day in and day out.&rdquo;
              </p>
              <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">— Robert Collier</p>
            </div>
          </article>
          
        </div>
      </div>

      {/* Active Task Section */}
      <section className="bg-white/70 dark:bg-inverse-surface/30 backdrop-blur-md border border-outline-variant/50 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-on-surface">Active Task</h3>
          <button 
            onClick={() => {
              setEditTitle(activeTask.title);
              setEditDesc(activeTask.description);
              setEditCategory(activeTask.category);
              setEditPriority(activeTask.priority);
              setShowTaskModal(true);
            }}
            className="flex items-center gap-1.5 text-primary text-xs font-bold hover:underline cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Change Task</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-surface-container-low/40 rounded-xl border border-outline-variant/30">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-on-surface">{activeTask.title}</h4>
            <p className="text-xs text-on-surface-variant">{activeTask.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
            <span className="px-3 py-1 bg-white/70 border border-outline-variant/30 rounded-lg text-[10px] font-bold text-primary">
              {activeTask.category}
            </span>
            <span className="px-3 py-1 bg-white/70 border border-outline-variant/30 rounded-lg text-[10px] font-bold text-on-surface-variant">
              {activeTask.priority}
            </span>
          </div>
        </div>
      </section>

      {/* Task Modal Editor Overlay */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
              <h3 className="text-md font-bold text-primary flex items-center gap-1.5">
                <Plus className="h-5 w-5" />
                <span>Configure Study Task</span>
              </h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Task Title</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary bg-surface/50" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Description</label>
                <textarea 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 text-sm border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary bg-surface/50" 
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Category Tag</label>
                  <select 
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary bg-surface/50"
                  >
                    <option value="Exam Prep">Exam Prep</option>
                    <option value="Homework">Homework</option>
                    <option value="Syllabus Review">Syllabus Review</option>
                    <option value="Formulas Practice">Formulas Practice</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Priority</label>
                  <select 
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary bg-surface/50"
                  >
                    <option value="Priority 1">Priority 1</option>
                    <option value="Priority 2">Priority 2</option>
                    <option value="Priority 3">Priority 3</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 py-2 text-xs font-bold rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-variant/20 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-full flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Update Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
