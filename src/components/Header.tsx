import React from 'react';
import { GraduationCap, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 transition-colors duration-200 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-primary-fixed-dim fill-primary/80" />
          <h1 className="text-xl font-extrabold text-white tracking-tight">ExamHub</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Open settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
