import React from 'react';
import { Github, Twitter, Linkedin, Facebook, Shield } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="mt-12 pt-6 pb-4 border-t border-outline-variant/30 text-center space-y-4 animate-in fade-in duration-300">
      {/* Social Media Placeholders */}
      <div className="flex justify-center items-center gap-4">
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-surface-container/40 hover:bg-primary-container/20 hover:text-primary text-on-surface-variant transition-all hover:scale-110"
          aria-label="Twitter / X"
          title="Twitter / X"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-surface-container/40 hover:bg-primary-container/20 hover:text-primary text-on-surface-variant transition-all hover:scale-110"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-surface-container/40 hover:bg-primary-container/20 hover:text-primary text-on-surface-variant transition-all hover:scale-110"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-surface-container/40 hover:bg-primary-container/20 hover:text-primary text-on-surface-variant transition-all hover:scale-110"
          aria-label="Facebook"
          title="Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </div>

      {/* Links & Brand */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant max-w-lg mx-auto px-4">
        <p className="font-medium text-on-surface/80">
          &copy; {currentYear} ExamHub Portal. All rights reserved.
        </p>
        <button
          onClick={onOpenPrivacy}
          className="flex items-center gap-1 text-primary hover:underline font-bold transition-all focus:outline-none cursor-pointer"
        >
          <Shield className="h-3.5 w-3.5" />
          <span>Privacy Policy</span>
        </button>
      </div>

      {/* Subtle description watermark */}
      <p className="text-[10px] text-outline/80 max-w-xs mx-auto leading-normal">
        Empowering offline-first candidate preparation for SSC, MPSC, UPSC and regional boards.
      </p>
    </footer>
  );
}
