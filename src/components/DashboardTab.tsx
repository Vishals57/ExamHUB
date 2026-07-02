import React, { useState } from 'react';
import { Timer, BookOpen, HelpCircle, CheckCircle, Flame, Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import RankPredictorTab from './RankPredictorTab';
import { RecentActivity } from '../types';

interface DashboardTabProps {
  onTabChange: (tabId: string) => void;
}

export default function DashboardTab({ onTabChange }: DashboardTabProps) {
  const [showRankPredictor, setShowRankPredictor] = useState(false);

  const activities: RecentActivity[] = [
    {
      id: 'act1',
      type: 'quiz',
      title: 'Practice Quiz: Astrophysics',
      time: 'Completed 14 minutes ago',
      score: '85%'
    },
    {
      id: 'act2',
      type: 'syllabus',
      title: 'Topic Completed: Thermodynamics',
      time: 'Yesterday at 6:45 PM',
      badge: 'Level 2'
    }
  ];

  if (showRankPredictor) {
    return <RankPredictorTab onBack={() => setShowRankPredictor(false)} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <section className="space-y-1">
        <h2 className="text-2xl font-extrabold text-primary dark:text-primary-fixed-dim">Focus Mode: Engaged.</h2>
        <p className="text-sm text-on-surface-variant">You&apos;re making excellent progress today, Sarah. Keep it up.</p>
      </section>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Daily Goal Gauge */}
        <div className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
          <div className="relative flex items-center justify-center mb-4">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle 
                className="stroke-outline-variant/30 fill-none" 
                cx="80" 
                cy="80" 
                r="70" 
                strokeWidth="10" 
              />
              <circle 
                className="stroke-primary fill-none transition-all duration-1000" 
                cx="80" 
                cy="80" 
                r="70" 
                strokeWidth="10" 
                strokeDasharray={440}
                strokeDashoffset={110} // 75% complete
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-on-surface">4.5</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">/ 6 Hours</span>
            </div>
          </div>
          <h3 className="text-md font-bold text-on-surface">Daily Goal</h3>
          <p className="text-xs text-on-surface-variant mt-1 text-center">75% reached for today.</p>
        </div>

        {/* Syllabus at a Glance (Horizontal progress) */}
        <div className="md:col-span-8 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BookOpen className="h-28 w-28 text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-md font-bold text-on-surface">Syllabus Progress</h3>
                <p className="text-xs text-on-surface-variant">Core Mathematics &amp; Advanced Physics</p>
              </div>
              <span className="text-xl font-extrabold text-primary">35%</span>
            </div>
            
            <div className="w-full bg-outline-variant/20 rounded-full h-3">
              <div className="bg-primary h-3 rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Completed</span>
                <span className="text-sm font-extrabold text-on-surface">12 Topics</span>
              </div>
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Remaining</span>
                <span className="text-sm font-extrabold text-on-surface">24 Topics</span>
              </div>
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Milestone</span>
                <span className="text-sm font-extrabold text-on-surface">5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <section className="space-y-3">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Quick Actions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={() => onTabChange('timer')}
            className="flex items-center gap-4 glass-tile-primary text-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/20 text-white rounded-xl group-hover:scale-105 transition-transform">
              <Timer className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Start Timer</span>
              <span className="text-xs opacity-80 mt-0.5">Deep Work Session</span>
            </div>
          </button>
          
          <button 
            onClick={() => onTabChange('syllabus')}
            className="flex items-center gap-4 glass-tile-secondary text-on-secondary-container p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/40 dark:bg-black/20 text-secondary rounded-xl group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Resume Syllabus</span>
              <span className="text-xs opacity-85 mt-0.5">Quantum Mechanics</span>
            </div>
          </button>
          
          <button 
            onClick={() => onTabChange('quiz')}
            className="flex items-center gap-4 glass-tile-tertiary text-on-tertiary-fixed p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/40 dark:bg-black/20 text-tertiary rounded-xl group-hover:scale-105 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Daily Quiz</span>
              <span className="text-xs opacity-85 mt-0.5">10 Questions Left</span>
            </div>
          </button>
        </div>
      </section>

      {/* Rank Predictor Preview Card */}
      <section 
        onClick={() => setShowRankPredictor(true)}
        className="glass-card rounded-2xl p-5 shadow-sm border border-primary/10 hover:border-primary/30 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">Leaderboard &amp; Rank Predictor</h4>
            <p className="text-xs text-on-surface-variant mt-0.5">Sarah, you are currently ranked in the <strong className="text-primary font-semibold">top 2%</strong> globally.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-primary text-xs font-bold w-full sm:w-auto justify-end">
          <span>View Standings &amp; Percentile</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="glass-card rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold text-on-surface">Recent Activity</h3>
          <button 
            onClick={() => onTabChange('syllabus')}
            className="text-primary text-xs font-bold hover:underline cursor-pointer"
          >
            View All History
          </button>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-4 bg-white/40 dark:bg-on-surface-variant/10 rounded-xl border border-outline-variant/30 backdrop-blur-sm hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'quiz' ? 'bg-primary-fixed/85 text-primary' : 'bg-secondary-fixed/85 text-secondary'}`}>
                  {activity.type === 'quiz' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-on-surface">{activity.title}</h5>
                  <p className="text-xs text-on-surface-variant mt-0.5">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.score && (
                  <span className="text-md font-extrabold text-primary">{activity.score}</span>
                )}
                {activity.badge && (
                  <span className="text-xs font-semibold bg-secondary-container/60 text-on-secondary-container px-2.5 py-1 rounded-md border border-outline-variant/20">
                    {activity.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
