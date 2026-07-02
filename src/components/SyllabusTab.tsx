import React, { useState, useEffect } from 'react';
import { Calculator, BrainCircuit, Languages, Globe, ChevronDown, ChevronUp, CheckCircle, BarChart3, BookOpen, Newspaper } from 'lucide-react';
import { SyllabusSection } from '../types';
import CurrentAffairsTab from './CurrentAffairsTab';

export default function SyllabusTab() {
  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'news'>('syllabus');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    quant: true,
    reasoning: false,
    english: false,
    ga: false
  });

  const [sections, setSections] = useState<SyllabusSection[]>([
    {
      id: 'quant',
      title: 'Quantitative Aptitude',
      iconName: 'quant',
      mastery: 60,
      topics: [
        { id: 'q1', name: 'Number Systems', completed: true },
        { id: 'q2', name: 'Algebra & Equations', completed: true },
        { id: 'q3', name: 'Percentages & Ratio', completed: true },
        { id: 'q4', name: 'Geometry & Mensuration', completed: false },
        { id: 'q5', name: 'Data Interpretation', completed: false }
      ]
    },
    {
      id: 'reasoning',
      title: 'Logical Reasoning',
      iconName: 'reasoning',
      mastery: 25,
      topics: [
        { id: 'r1', name: 'Syllogism', completed: true },
        { id: 'r2', name: 'Blood Relations', completed: false },
        { id: 'r3', name: 'Seating Arrangement', completed: false },
        { id: 'r4', name: 'Critical Reasoning', completed: false }
      ]
    },
    {
      id: 'english',
      title: 'English Language',
      iconName: 'english',
      mastery: 50,
      topics: [
        { id: 'e1', name: 'Reading Comprehension', completed: true },
        { id: 'e2', name: 'Vocabulary & Grammar', completed: true },
        { id: 'e3', name: 'Sentence Completion', completed: false },
        { id: 'e4', name: 'Cloze Test', completed: false }
      ]
    },
    {
      id: 'ga',
      title: 'General Awareness',
      iconName: 'ga',
      mastery: 0,
      topics: [
        { id: 'ga1', name: 'Current Affairs', completed: false },
        { id: 'ga2', name: 'Static GK', completed: false },
        { id: 'ga3', name: 'Economy & Banking', completed: false }
      ]
    }
  ]);

  const [globalProgress, setGlobalProgress] = useState(38);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTopicToggle = (sectionId: string, topicId: string) => {
    setSections(prevSections => {
      const updated = prevSections.map(sec => {
        if (sec.id === sectionId) {
          const updatedTopics = sec.topics.map(t => {
            if (t.id === topicId) {
              return { ...t, completed: !t.completed };
            }
            return t;
          });
          
          const completedCount = updatedTopics.filter(t => t.completed).length;
          const newMastery = Math.round((completedCount / updatedTopics.length) * 100);
          
          return {
            ...sec,
            topics: updatedTopics,
            mastery: newMastery
          };
        }
        return sec;
      });

      // Recalculate global progress
      let total = 0;
      let completed = 0;
      updated.forEach(s => {
        total += s.topics.length;
        completed += s.topics.filter(t => t.completed).length;
      });
      setGlobalProgress(Math.round((completed / total) * 100));

      return updated;
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'quant': return <Calculator className="h-5 w-5 text-primary" />;
      case 'reasoning': return <BrainCircuit className="h-5 w-5 text-primary" />;
      case 'english': return <Languages className="h-5 w-5 text-primary" />;
      case 'ga': return <Globe className="h-5 w-5 text-primary" />;
      default: return <Calculator className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher at Top */}
      <div className="flex bg-surface-container/50 rounded-full p-1 border border-outline-variant/30 max-w-sm mx-auto">
        <button
          onClick={() => setActiveSubTab('syllabus')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'syllabus'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Syllabus Tracker</span>
        </button>
        <button
          onClick={() => setActiveSubTab('news')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'news'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Newspaper className="h-4 w-4" />
          <span>Current Affairs</span>
        </button>
      </div>

      {activeSubTab === 'news' ? (
        <CurrentAffairsTab />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Page Hero & overall progress card */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-on-background">Syllabus Progress</h2>
              <p className="text-sm text-on-surface-variant leading-normal">
                Track your mastery and checklist items across key examination verticals.
              </p>
            </div>

            {/* Global Stats Card */}
            <div className="p-6 bg-primary-container rounded-2xl text-white shadow-lg flex items-center justify-between relative overflow-hidden ring-1 ring-inset ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed-dim/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest text-on-primary-container">Overall Completion</p>
                <p className="text-4xl font-black mt-1 leading-none transition-all">{globalProgress}%</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-inner relative z-10">
                <BarChart3 className="h-6 w-6 text-on-primary-container" />
              </div>
            </div>
          </section>

          {/* Syllabus Category Accordions */}
          <div className="space-y-4" id="syllabus-container">
            {sections.map((section) => {
              const isExpanded = expandedSections[section.id];
              return (
                <div 
                  key={section.id} 
                  className={`bg-white/60 backdrop-blur-md border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                    isExpanded 
                      ? 'border-primary/30 shadow-md ring-1 ring-primary/5' 
                      : 'border-outline-variant/40'
                  }`}
                >
                  {/* Collapsible Trigger Button */}
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-5 flex flex-col text-left gap-3 hover:bg-white/40 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center gap-3">
                        {getIcon(section.iconName)}
                        <h3 className="font-bold text-sm text-on-surface">{section.title}</h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-on-surface-variant" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-on-surface-variant" />
                      )}
                    </div>
                    
                    <div className="w-full space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-on-surface-variant">Mastery Level</span>
                        <span className="text-primary">{section.mastery}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary-container/50 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar-fill h-full bg-primary" 
                          style={{ width: `${section.mastery}%` }}
                        ></div>
                      </div>
                    </div>
                  </button>

                  {/* Subtopics Checklist Panel */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-outline-variant/10 bg-white/30 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 gap-3.5 pt-4">
                        {section.topics.map((topic) => (
                          <div 
                            key={topic.id} 
                            onClick={() => handleTopicToggle(section.id, topic.id)}
                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:border-primary/40 transition-all select-none ${
                              topic.completed 
                                ? 'bg-secondary-container/40 border-primary shadow-sm' 
                                : 'bg-white/40 border-outline-variant/40'
                            }`}
                          >
                            <span className={`text-xs font-semibold ${topic.completed ? 'text-primary' : 'text-on-surface'}`}>
                              {topic.name}
                            </span>
                            <div className="flex items-center">
                              {topic.completed ? (
                                <CheckCircle className="h-5 w-5 text-primary fill-primary-fixed-dim/40" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-outline-variant/60 bg-white/60"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
