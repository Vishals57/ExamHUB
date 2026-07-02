import React, { useState, useEffect } from 'react';
import { Calculator, BrainCircuit, Languages, Globe, Map, ChevronDown, ChevronUp, CheckCircle, BarChart3, BookOpen, Newspaper } from 'lucide-react';
import { SyllabusSection } from '../types';
import CurrentAffairsTab from './CurrentAffairsTab';

export default function SyllabusTab() {
  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'news'>('syllabus');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    quant: true,
    reasoning: false,
    english: false,
    ga: false,
    state: false
  });

  const [sections, setSections] = useState<SyllabusSection[]>([
    {
      id: 'quant',
      title: 'Quantitative Aptitude (Mathematics)',
      iconName: 'quant',
      mastery: 50,
      topics: [
        { id: 'q1', name: 'Number System (HCF, LCM, Divisibility & Surds)', completed: true },
        { id: 'q2', name: 'Simplification, Fractions, Power & Indices', completed: true },
        { id: 'q3', name: 'Percentage, Profit, Loss & Discount', completed: true },
        { id: 'q4', name: 'Ratio & Proportion, Mixture & Alligation', completed: true },
        { id: 'q5', name: 'Average, Age Problems & Partnership', completed: true },
        { id: 'q6', name: 'Time, Speed & Distance (Trains, Boats, Races)', completed: false },
        { id: 'q7', name: 'Time & Work, Pipes & Cisterns', completed: true },
        { id: 'q8', name: 'Basic Algebra & Quadratic Equations', completed: false },
        { id: 'q9', name: 'Geometry (Lines, Angles, Triangles, Circles)', completed: false },
        { id: 'q10', name: 'Mensuration 2D & 3D (Area, Surface Area & Volume)', completed: false },
        { id: 'q11', name: 'Trigonometry (Ratios, Identities, Heights & Distances)', completed: false },
        { id: 'q12', name: 'Data Interpretation (Bar, Pie, Line Graphs & Tables)', completed: false }
      ]
    },
    {
      id: 'reasoning',
      title: 'Logical Reasoning & General Intelligence',
      iconName: 'reasoning',
      mastery: 45,
      topics: [
        { id: 'r1', name: 'Analogy & Classification (Verbal & Figural)', completed: true },
        { id: 'r2', name: 'Series (Number, Alphanumeric & Letter)', completed: true },
        { id: 'r3', name: 'Coding-Decoding & Alphabet Test', completed: true },
        { id: 'r4', name: 'Blood Relations & Family Tree', completed: true },
        { id: 'r5', name: 'Direction & Distance Sense Test', completed: false },
        { id: 'r6', name: 'Syllogism (Venn Diagram Method)', completed: true },
        { id: 'r7', name: 'Seating Arrangement (Linear, Circular, Row)', completed: false },
        { id: 'r8', name: 'Puzzles (Scheduling, Floor & Comparison-based)', completed: false },
        { id: 'r9', name: 'Mathematical Operations & Inequalities', completed: false },
        { id: 'r10', name: 'Non-Verbal (Paper Folding, Mirror/Water Images, Cubes)', completed: false },
        { id: 'r11', name: 'Data Sufficiency, Cause & Effect, Assumptions', completed: false }
      ]
    },
    {
      id: 'english',
      title: 'English Language & Comprehension',
      iconName: 'english',
      mastery: 63,
      topics: [
        { id: 'e1', name: 'Reading Comprehension (Passages & Themes)', completed: true },
        { id: 'e2', name: 'Cloze Test & Fill in the Blanks', completed: true },
        { id: 'e3', name: 'Error Spotting (Grammar Rules, Pronoun, Prepositions)', completed: true },
        { id: 'e4', name: 'Sentence Improvement & Phrase Replacement', completed: true },
        { id: 'e5', name: 'Para Jumbles & Sentence Rearrangement', completed: false },
        { id: 'e6', name: 'Synonyms, Antonyms & One Word Substitutions', completed: true },
        { id: 'e7', name: 'Idioms, Phrases & Spelling Corrections', completed: false },
        { id: 'e8', name: 'Active/Passive Voice & Direct/Indirect Narration', completed: false }
      ]
    },
    {
      id: 'ga',
      title: 'General Awareness (GK & General Science)',
      iconName: 'ga',
      mastery: 50,
      topics: [
        { id: 'ga1', name: 'History (Ancient, Medieval & Modern Indian Freedom Struggle)', completed: true },
        { id: 'ga2', name: 'Geography (Indian Physical, Climate & World Resources)', completed: true },
        { id: 'ga3', name: 'Indian Polity (Preamble, Fundamental Rights & Parliament)', completed: true },
        { id: 'ga4', name: 'Indian Economy (Inflation, Banking, Union Budget, Five Year Plans)', completed: false },
        { id: 'ga5', name: 'General Science (Basic Physics, Chemistry & Biology)', completed: true },
        { id: 'ga6', name: 'Static GK (National Parks, Rivers, Dances, Books, Awards)', completed: false },
        { id: 'ga7', name: 'Current Affairs (National, International & Key Govt Schemes)', completed: false },
        { id: 'ga8', name: 'Computer Aptitude & Information Technology Awareness', completed: false }
      ]
    },
    {
      id: 'state',
      title: 'State Board Specific & Regional GK',
      iconName: 'state',
      mastery: 20,
      topics: [
        { id: 's1', name: 'History of Maharashtra & Social Reformers (Phule, Shahu, Ambedkar)', completed: true },
        { id: 's2', name: 'Geography of Maharashtra (Rivers, Soils, Minerals & Western Ghats)', completed: false },
        { id: 's3', name: 'State Administration & Panchayati Raj Structure', completed: false },
        { id: 's4', name: 'State Board Textbooks Highlights (History, Geography, Civics)', completed: false },
        { id: 's5', name: 'Maharashtra State Economy, Agriculture & Regional Welfare Schemes', completed: false }
      ]
    }
  ]);

  const [globalProgress, setGlobalProgress] = useState(48);

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
      case 'state': return <Map className="h-5 w-5 text-primary" />;
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
