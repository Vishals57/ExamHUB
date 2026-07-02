import React from 'react';
import { LayoutDashboard, BookOpen, Timer, HelpCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'syllabus', label: 'Syllabus', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'timer', label: 'Timer', icon: <Timer className="h-5 w-5" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-5 w-5" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white/70 dark:bg-inverse-surface/80 backdrop-blur-md shadow-[0_-8px_32px_0_rgba(0,0,0,0.08)] z-40 rounded-t-2xl border-t border-outline-variant/30 transition-colors duration-200">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-2xl transition-all duration-150 active:scale-95 cursor-pointer ${
              isActive 
                ? 'bg-primary-container/20 dark:bg-primary-container/40 text-primary dark:text-on-primary-container font-bold' 
                : 'text-on-surface-variant dark:text-surface-variant hover:text-primary'
            }`}
          >
            {item.icon}
            <span className="text-[10px] tracking-wide mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
