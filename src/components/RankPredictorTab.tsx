import React, { useState } from 'react';
import { Share2, Check, Trophy, Users, Award, Flame, Zap, Compass, AlertCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { LeaderboardUser } from '../types';

interface RankPredictorTabProps {
  onBack: () => void;
}

export default function RankPredictorTab({ onBack }: RankPredictorTabProps) {
  const [copied, setCopied] = useState(false);

  const toppers: LeaderboardUser[] = [
    {
      rank: '01',
      name: 'Sarah Mitchell',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      recentScore: '798/800',
      percentile: '99.9th',
      badge: 'Top Performer'
    },
    {
      rank: '02',
      name: 'David Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      recentScore: '792/800',
      percentile: '99.8th',
      badge: 'Streak: 15 Days'
    },
    {
      rank: '03',
      name: 'Priya Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      recentScore: '789/800',
      percentile: '99.7th',
      badge: 'Fastest Mover'
    }
  ];

  const currentUser: LeaderboardUser = {
    rank: '1248',
    name: 'Sarah Mitchell (You)', // Matching name on dashboard "Sarah"
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    recentScore: '780/800',
    percentile: '98.4th',
    isCurrentUser: true
  };

  const handleShare = () => {
    navigator.clipboard.writeText('https://examhub.aistudio.run/score/sarah');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back to Dashboard bar */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary font-medium hover:underline cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard Overview
      </button>

      {/* Hero Rank Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 glass-card rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-primary">Rank Predictor</h1>
                <p className="text-on-surface-variant text-sm">Based on your last 5 mock exams and learning velocity.</p>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-primary tracking-tighter">#1,248</span>
                <span className="text-sm font-medium text-on-surface-variant mb-1">Estimated Rank</span>
              </div>
              
              <div className="flex items-center gap-2 text-primary-container font-semibold text-sm">
                <Flame className="h-5 w-5 text-amber-600 fill-amber-500 animate-pulse" />
                <span>Top 2% improvement since last week</span>
              </div>
              
              <button 
                onClick={handleShare}
                className="bg-primary hover:bg-primary-container text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? 'Copied Share Link!' : 'Share with Friends'}
              </button>
            </div>
            
            {/* Percentile gauge display */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  className="stroke-outline-variant/30 fill-none" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  className="stroke-primary fill-none transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  strokeDasharray={464}
                  strokeDashoffset={464 - (98.4 / 100) * 464}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="block text-3xl font-extrabold text-primary">98.4</span>
                <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Percentile</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats view */}
        <aside className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6">
          <div className="glass-card rounded-2xl p-5 flex-1 shadow-sm border-l-4 border-primary">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Mock Accuracy</span>
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">87.5%</div>
            <div className="mt-4 w-full bg-surface-container rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-fixed-dim to-primary h-2 rounded-full" style={{ width: '87.5%' }}></div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-5 flex-1 shadow-sm border-l-4 border-amber-600">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Global Competitors</span>
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-on-surface">42,890</div>
            <p className="text-xs text-on-surface-variant mt-1">Active candidates this week</p>
          </div>
        </aside>
      </div>

      {/* Leaderboard and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Weekly toppers leaderboard */}
        <section className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">Weekly Toppers</h2>
            <div className="flex bg-surface-container rounded-full p-1 text-xs font-medium">
              <button className="bg-white text-primary rounded-full px-4 py-1.5 shadow-sm">Global</button>
              <button className="text-on-surface-variant px-4 py-1.5 cursor-not-allowed">Friends</button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* User row: Special state */}
            <div className="bg-primary text-white rounded-xl p-4 flex items-center justify-between shadow-md border border-primary-container">
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg w-8">{currentUser.rank}</span>
                <div className="relative">
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/25" 
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white text-[9px] font-bold px-1 rounded-full border border-primary">
                    YOU
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm">{currentUser.name}</div>
                  <div className="text-xs opacity-85">Recent Score: {currentUser.recentScore}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{currentUser.percentile}</div>
                <div className="text-xs opacity-85">Percentile</div>
              </div>
            </div>

            {/* Leaderboard list of top users */}
            <div className="glass-card rounded-xl overflow-hidden shadow-sm divide-y divide-outline-variant/20">
              {toppers.map((topper) => (
                <div key={topper.rank} className="p-4 flex items-center justify-between hover:bg-surface-container/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg w-8 text-primary-container">{topper.rank}</span>
                    <img 
                      src={topper.avatarUrl} 
                      alt={topper.name} 
                      className="w-12 h-12 rounded-full object-cover border border-outline-variant/30" 
                    />
                    <div>
                      <div className="font-bold text-sm text-on-surface">{topper.name}</div>
                      <div className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        {topper.badge?.includes('Streak') ? <Flame className="h-3 w-3 text-orange-600" /> : <Trophy className="h-3 w-3 text-amber-500" />}
                        <span>{topper.badge}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary text-sm">{topper.percentile}</div>
                    <div className="text-xs text-on-surface-variant">Percentile</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations & Referrals */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-on-surface flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span>Road to #100</span>
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              To reach the Top 100, you need to improve your <strong className="text-primary font-semibold">Quantitative Reasoning</strong> by 12 points.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                <div className="w-9 h-9 bg-tertiary-container/10 rounded-full flex items-center justify-center text-amber-800">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface">Calculus Review</div>
                  <div className="text-[10px] text-on-surface-variant">Recommended Resource</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                <div className="w-9 h-9 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface">Topic Challenge</div>
                  <div className="text-[10px] text-on-surface-variant">Practice difficult questions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Invite Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-primary p-5 h-48 flex flex-col justify-end group shadow-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=300')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/65 to-transparent"></div>
            
            <div className="relative z-10 space-y-1 text-white">
              <div className="text-md font-bold flex items-center gap-1">
                <span>Refer &amp; Compete</span>
                <ExternalLink className="h-3 w-3" />
              </div>
              <p className="text-[11px] opacity-90 leading-normal">
                Invite friends to unlock the &lsquo;Elite Rival&rsquo; dashboard and compare daily progress side-by-side.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
