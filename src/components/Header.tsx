import React from 'react';
import { GraduationCap, Sun, Moon, Settings } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

export default function Header({ darkMode, onToggleDarkMode, onOpenSettings }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-outline-variant/30 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-primary-container fill-primary-fixed-dim" />
          <h1 className="text-xl font-bold text-primary tracking-tight">ExamHub</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-variant/50 dark:hover:bg-on-surface-variant/20 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-on-surface-variant" />
            )}
          </button>
          
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-surface-variant/50 dark:hover:bg-on-surface-variant/20 transition-colors duration-200"
            aria-label="Open settings"
          >
            <Settings className="h-5 w-5 text-on-surface-variant" />
          </button>
        </div>
      </div>
    </header>
  );
}
