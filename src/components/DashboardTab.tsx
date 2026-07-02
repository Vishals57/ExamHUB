import React, { useState } from 'react';
import { Timer, BookOpen, HelpCircle, CheckCircle, Flame, Calendar, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import RankPredictorTab from './RankPredictorTab';
import { RecentActivity } from '../types';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface DashboardTabProps {
  onTabChange: (tabId: string) => void;
}

const studyData = [
  { day: 'Fri', dayName: 'Friday, June 26', hours: 4.2 },
  { day: 'Sat', dayName: 'Saturday, June 27', hours: 5.5 },
  { day: 'Sun', dayName: 'Sunday, June 28', hours: 3.8 },
  { day: 'Mon', dayName: 'Monday, June 29', hours: 6.0 },
  { day: 'Tue', dayName: 'Tuesday, June 30', hours: 4.5 },
  { day: 'Wed', dayName: 'Wednesday, July 1', hours: 5.2 },
  { day: 'Thu', dayName: 'Thursday, July 2 (Today)', hours: 4.5 }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 15
    }
  }
};

export default function DashboardTab({ onTabChange }: DashboardTabProps) {
  const [showRankPredictor, setShowRankPredictor] = useState(false);

  const activities: RecentActivity[] = [
    {
      id: 'act1',
      type: 'quiz',
      title: 'Practice Quiz: Quantitative Aptitude',
      time: 'Completed 14 minutes ago',
      score: '90%'
    },
    {
      id: 'act2',
      type: 'syllabus',
      title: 'Topic Completed: Indian Constitution (Fundamental Rights)',
      time: 'Yesterday at 6:45 PM',
      badge: 'Level 2'
    }
  ];

  if (showRankPredictor) {
    return <RankPredictorTab onBack={() => setShowRankPredictor(false)} />;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.section variants={itemVariants} className="space-y-1">
        <h2 className="text-2xl font-extrabold text-primary dark:text-primary-fixed-dim">Focus Mode: Engaged.</h2>
        <p className="text-sm text-on-surface-variant">You&apos;re making excellent progress today, Sarah. Keep it up.</p>
      </motion.section>

      {/* Main Stats Row */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Daily Goal Gauge */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm"
        >
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
        </motion.div>

        {/* Weekly Study Duration (Bar Chart) */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-8 glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-md font-bold text-on-surface">Weekly Study Tracker</h3>
              <p className="text-xs text-on-surface-variant">Daily duration over the last 7 days</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-primary block">33.7 Hrs</span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/10">
                +4.2h vs last week
              </span>
            </div>
          </div>
          
          <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'currentColor', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  className="text-on-surface-variant/70"
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'currentColor', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  className="text-on-surface-variant/70"
                  unit="h"
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,53,39,0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-zinc-900 backdrop-blur-md p-2.5 rounded-xl border border-outline-variant/30 shadow-lg text-xs leading-none">
                          <p className="font-bold text-on-surface dark:text-white mb-1">{payload[0].payload.dayName}</p>
                          <p className="text-primary dark:text-primary-fixed-dim font-extrabold mt-1">
                            {payload[0].value} Hours
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="hours" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={30}
                >
                  {studyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'Thu' ? 'var(--color-primary)' : 'var(--color-on-primary-container)'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Syllabus Progress Card */}
      {/* Syllabus at a Glance (Horizontal progress) */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden relative"
      >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BookOpen className="h-28 w-28 text-primary" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-md font-bold text-on-surface">Syllabus Progress</h3>
                <p className="text-xs text-on-surface-variant">Govt Exams Syllabus (SSC, MPSC, UPSC &amp; Banking)</p>
              </div>
              <span className="text-xl font-extrabold text-primary">48%</span>
            </div>
            
            <div className="w-full bg-outline-variant/20 rounded-full h-3">
              <div className="bg-primary h-3 rounded-full transition-all duration-1000" style={{ width: '48%' }}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Completed</span>
                <span className="text-sm font-extrabold text-on-surface">21 Topics</span>
              </div>
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Remaining</span>
                <span className="text-sm font-extrabold text-on-surface">23 Topics</span>
              </div>
              <div className="bg-surface-container-low/40 dark:bg-on-surface-variant/20 p-3 rounded-xl border border-white/20 backdrop-blur-sm">
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Milestone</span>
                <span className="text-sm font-extrabold text-on-surface">6 Days</span>
              </div>
            </div>
          </div>
        </motion.div>

      {/* Quick Actions Grid */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Quick Actions</h4>
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange('timer')}
            className="flex items-center gap-4 glass-tile-primary text-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/20 text-white rounded-xl group-hover:scale-105 transition-transform">
              <Timer className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Start Timer</span>
              <span className="text-xs opacity-80 mt-0.5">Deep Work Session</span>
            </div>
          </motion.button>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange('syllabus')}
            className="flex items-center gap-4 glass-tile-secondary text-on-secondary-container p-5 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/40 dark:bg-black/20 text-secondary rounded-xl group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Resume Syllabus</span>
              <span className="text-xs opacity-85 mt-0.5">Polity &amp; Constitution</span>
            </div>
          </motion.button>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange('quiz')}
            className="flex items-center gap-4 glass-tile-tertiary text-on-tertiary-fixed p-5 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <span className="p-3 bg-white/40 dark:bg-black/20 text-tertiary rounded-xl group-hover:scale-105 transition-transform">
              <HelpCircle className="h-5 w-5" />
            </span>
            <div>
              <span className="block font-bold text-md leading-tight">Daily Quiz</span>
              <span className="text-xs opacity-85 mt-0.5">10 Questions Left</span>
            </div>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Rank Predictor Preview Card */}
      <motion.section 
        variants={itemVariants}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
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
      </motion.section>

      {/* Recent Activity */}
      <motion.section variants={itemVariants} className="glass-card rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold text-on-surface">Recent Activity</h3>
          <button 
            onClick={() => onTabChange('syllabus')}
            className="text-primary text-xs font-bold hover:underline cursor-pointer"
          >
            View All History
          </button>
        </div>
        
        <motion.div variants={containerVariants} className="space-y-3">
          {activities.map((activity) => (
            <motion.div 
              key={activity.id} 
              variants={itemVariants}
              whileHover={{ x: 2, transition: { duration: 0.1 } }}
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
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
