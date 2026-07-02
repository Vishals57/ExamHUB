/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardTab from './components/DashboardTab';
import SyllabusTab from './components/SyllabusTab';
import TimerTab from './components/TimerTab';
import QuizTab from './components/QuizTab';
import Footer from './components/Footer';
import { X, CheckCircle, GraduationCap, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [customMinutes, setCustomTime] = useState(25);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onTabChange={handleTabChange} />;
      case 'syllabus':
        return <SyllabusTab />;
      case 'timer':
        return <TimerTab />;
      case 'quiz':
        return <QuizTab />;
      default:
        return <DashboardTab onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-on-background text-on-surface dark:text-inverse-on-surface transition-colors duration-200">
      
      {/* Universal Sticky App Header */}
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Page Layout Container */}
      <main className="w-full max-w-4xl mx-auto px-4 pt-24 pb-28 min-h-[calc(100vh-112px)] flex flex-col justify-between">
        <div className="flex-1">
          {renderActiveTabContent()}
        </div>
        <Footer onOpenPrivacy={() => setShowPrivacy(true)} />
      </main>

      {/* Universal Sticky Bottom Navigation Bar */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Settings Modal Dialog Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-250">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
              <h3 className="text-md font-bold text-primary flex items-center gap-1.5">
                <GraduationCap className="h-5 w-5" />
                <span>Configure ExamHub Settings</span>
              </h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-2">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                ExamHub is optimized offline-first to help you focus and study for competitive examinations. Adjust timer options below:
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Pomodoro Timer length (minutes)
                </label>
                <div className="flex gap-2">
                  {[15, 25, 45, 50].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => {
                        setCustomTime(mins);
                        alert(`Pomodoro timer updated to ${mins} minutes! Please reset the timer to apply the change.`);
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        customMinutes === mins
                          ? 'bg-primary border-primary text-white shadow-sm'
                          : 'bg-white border-outline-variant/40 text-on-surface-variant hover:bg-surface-container/50'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container/40 p-4 rounded-xl border border-outline-variant/20 space-y-2 text-xs text-on-surface-variant leading-relaxed">
                <span className="font-bold text-primary block">Candidate Profile</span>
                <p>Name: <strong className="text-on-surface">Sarah Mitchell</strong></p>
                <p>Curriculum Focus: <strong className="text-on-surface">UPSC CSE &amp; SSC GCL</strong></p>
                <p>Streak: <strong className="text-primary font-semibold">15 study days active</strong></p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-full flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Save &amp; Apply Configurations</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal Dialog Overlay */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-250">
          <div className="bg-white dark:bg-inverse-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/30 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-250">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
              <h3 className="text-md font-bold text-primary flex items-center gap-1.5">
                <Shield className="h-5 w-5" />
                <span>ExamHub Privacy Policy</span>
              </h3>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs text-on-surface-variant dark:text-surface-variant leading-relaxed scrollbar-thin">
              <p className="font-semibold text-on-surface dark:text-inverse-on-surface">Last Updated: July 2026</p>
              
              <p>
                At <strong>ExamHub</strong>, we prioritize the confidentiality and privacy of our students. This policy outlines how we handle data and preserve your security.
              </p>

              <div className="space-y-1.5">
                <h4 className="font-bold text-primary dark:text-primary-fixed-dim">1. Offline-First Storage</h4>
                <p>
                  ExamHub is built on an offline-first architecture. Your mock exam scores, syllabus checklists, and Pomodoro focus statistics are saved directly on your local device cache (Local Storage). We do not transmit this progress data to any remote servers.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-primary dark:text-primary-fixed-dim">2. Personal Information</h4>
                <p>
                  We do not ask for, collect, or store any sensitive personal identifying details. The name (&ldquo;Sarah Mitchell&rdquo;) is a local preset used strictly to personalize your portal and local study dashboard.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-primary dark:text-primary-fixed-dim">3. Third-Party Integrations</h4>
                <p>
                  Our portals do not share tracking codes or cookies with marketing agencies. Placeholders for social media accounts (such as Twitter, GitHub, and LinkedIn) are provided solely for connection and mock referral previews.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-primary dark:text-primary-fixed-dim">4. Cookies &amp; Cache</h4>
                <p>
                  We utilize standard web browser local state and session configurations to maintain dark theme preferences and keep you signed in to your offline mock dashboard session. You can clear this data at any time by resetting your browser storage.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/10 flex justify-end">
              <button 
                onClick={() => setShowPrivacy(false)}
                className="py-2.5 px-6 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-full cursor-pointer shadow-md transition-all"
              >
                Understood &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

