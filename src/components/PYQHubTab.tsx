import React, { useState } from 'react';
import { Landmark, ArrowRight, FileText, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import { PastExamPaper } from '../types';

interface PYQHubTabProps {
  onStartExam: (paperTitle: string) => void;
}

export default function PYQHubTab({ onStartExam }: PYQHubTabProps) {
  const [selectedFilter, setSelectedFilter] = useState('All Subjects');

  const filters = [
    'All Subjects',
    'Quantitative Aptitude',
    'General Intelligence',
    'English Language',
    'General Awareness',
    'State Board Specific'
  ];

  const papers: PastExamPaper[] = [
    {
      id: 'p1',
      exam: 'SSC CGL',
      title: 'SSC CGL 2023',
      questions: 100,
      duration: 60,
      iconName: 'ssc'
    },
    {
      id: 'p2',
      exam: 'MPSC',
      title: 'MPSC Rajyaseva 2022',
      questions: 100,
      duration: 120,
      iconName: 'mpsc'
    },
    {
      id: 'p3',
      exam: 'IBPS',
      title: 'IBPS PO 2023',
      questions: 100,
      duration: 60,
      iconName: 'ibps'
    },
    {
      id: 'p4',
      exam: 'UPSC',
      title: 'UPSC CSE 2023',
      questions: 100,
      duration: 120,
      iconName: 'upsc'
    },
    {
      id: 'p5',
      exam: 'RRB',
      title: 'RRB NTPC 2021',
      questions: 100,
      duration: 90,
      iconName: 'rrb'
    },
    {
      id: 'p6',
      exam: 'SBI',
      title: 'SBI Clerk 2022',
      questions: 100,
      duration: 60,
      iconName: 'sbi'
    }
  ];

  const handleStartPractice = (paper: PastExamPaper) => {
    onStartExam(`${paper.title} — ${paper.exam} Practice Mock`);
  };

  const getIcon = (iconName: string) => {
    // Elegant government or financial representations
    return (
      <div className="bg-primary-container/10 p-3.5 rounded-xl text-primary border border-primary-container/5">
        <Landmark className="h-6 w-6" />
      </div>
    );
  };

  const getDescription = (paper: PastExamPaper) => {
    switch (paper.exam) {
      case 'SSC CGL': return 'Tier 1: Combined Graduate Level Examination';
      case 'MPSC': return 'Paper 1: General Studies (Prelims)';
      case 'IBPS': return 'Prelims: Probationary Officer Scale I';
      case 'UPSC': return 'GS Paper 1: Civil Services Examination';
      case 'RRB': return 'CBT 1: Non-Technical Popular Categories';
      case 'SBI': return 'Prelims: Junior Associates Recruitment';
      default: return 'Full syllabus preparatory evaluation mock paper.';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <section className="space-y-1">
        <h2 className="text-2xl font-extrabold text-on-surface">PYQ Hub</h2>
        <p className="text-sm text-on-surface-variant max-w-2xl">
          Master your goals with previous year question papers from top government exams.
        </p>
      </section>

      {/* Filter Chips Slider */}
      <section className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                if (filter !== 'All Subjects') {
                  alert(`Filtering by ${filter}... (Pre-configured simulation showing core highlights)`);
                }
                setSelectedFilter(filter);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer active:scale-95 ${
                selectedFilter === filter
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white border-outline-variant/40 text-on-surface-variant hover:bg-surface-container/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <div key={paper.id} className="glass-card rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all border border-outline-variant/30">
            <div className="flex justify-between items-start">
              {getIcon(paper.iconName)}
              <span className="bg-tertiary-container/10 text-on-tertiary-container text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-on-tertiary-container/5">
                Exam: {paper.exam}
              </span>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-md font-bold text-on-surface leading-snug">{paper.title}</h3>
              <p className="text-xs text-on-surface-variant">{getDescription(paper)}</p>
            </div>

            <div className="flex items-center gap-5 py-1.5 border-t border-b border-outline-variant/10 text-xs font-semibold text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-outline" />
                <span>{paper.questions} Qs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-outline" />
                <span>{paper.duration} Mins</span>
              </div>
            </div>

            <button 
              onClick={() => handleStartPractice(paper)}
              className="w-full bg-primary hover:bg-primary-container text-white font-bold text-xs py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Start Practice</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Load More */}
      <div className="flex justify-center pt-2">
        <button 
          onClick={() => alert('No additional papers to load right now.')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-outline/50 text-primary font-bold text-xs hover:bg-primary-container/10 transition-colors cursor-pointer active:scale-95"
        >
          <span>Load More Papers</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
