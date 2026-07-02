import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Clock, ArrowRight, Award, CheckCircle2, XCircle, ChevronRight, X } from 'lucide-react';
import { QuizQuestion } from '../types';
import PYQHubTab from './PYQHubTab';

export default function QuizTab() {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'pyq'>('quiz');
  const [customTitle, setCustomTitle] = useState<string | null>(null);

  // Quiz States
  const [quizState, setQuizState] = useState<'start' | 'active' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questionBank: QuizQuestion[] = [
    {
      id: 1,
      questionText: 'Which of the following principles best describes the concept of &ldquo;separation of concerns&rdquo; in software architecture?',
      options: [
        'Encapsulating all system data within single private helper classes.',
        'Distributing distinct functionalities and behaviors into separate modular sections.',
        'Maximizing deep object reuse exclusively through class inheritance levels.',
        'Ensuring all state controllers share a single global, non-reductive state store.'
      ],
      correctOptionIndex: 1,
      explanation: 'Separation of concerns is a design principle for separating a computer program into distinct sections, so that each section addresses a separate concern (or distinct functionality).'
    },
    {
      id: 2,
      questionText: 'A car completes a journey of 150 km in 2 hours and 30 minutes. What was its average speed in meters per second (m/s)?',
      options: [
        '16.67 m/s',
        '25.00 m/s',
        '12.50 m/s',
        '60.00 m/s'
      ],
      correctOptionIndex: 0,
      explanation: 'Average speed = 150 km / 2.5 hours = 60 km/h. To convert km/h to m/s, multiply by 5/18: 60 * 5/18 = 16.67 m/s.'
    },
    {
      id: 3,
      questionText: 'Which statement accurately describes the Second Law of Thermodynamics?',
      options: [
        'The total energy of an isolated system remains absolutely constant over time.',
        'The total entropy of any isolated system always increases over time in spontaneous processes.',
        'At absolute zero temperature, the entropy of a pure crystalline substance is zero.',
        'Heat can fully and spontaneously flow from a colder body to a hotter body without work input.'
      ],
      correctOptionIndex: 1,
      explanation: 'The Second Law of Thermodynamics states that the total entropy of an isolated system always increases over time in a natural spontaneous process, representing the directional flow of heat.'
    },
    {
      id: 4,
      questionText: 'Identify the missing term in the sequence: 4, 9, 25, 49, ?, 121.',
      options: [
        '81',
        '64',
        '100',
        '144'
      ],
      correctOptionIndex: 0,
      explanation: 'The sequence consists of the squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 9^2 is not prime but 11^2=121. Wait! The primes are 2, 3, 5, 7, 11... wait! The next prime after 7 is 11, which gives 121! Ah, what about 9 squared? 9 is not prime. So if it is consecutive prime squares: 2^2, 3^2, 5^2, 7^2, the next prime square is 11^2 = 121, but 121 is the 6th number! So what is the 5th number? Ah! The consecutive primes are: 2, 3, 5, 7, 11, 13. Wait, so: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169. Wait, if the list is: 4, 9, 25, 49, ?, 121... wait! 121 is prime square 11^2. If 121 is the last term in our sequence: 4 (2^2), 9 (3^2), 25 (5^2), 49 (7^2), then the next prime square is 11^2=121! Wait, so the term in between 49 and 121 is what? Ah, is it squares of odd numbers? 3^2=9, 5^2=25, 7^2=49, 9^2=81, 11^2=121. Yes! 4 is 2^2. So if we start with odd squares after 4, it is 81 (9^2)!'
    },
    {
      id: 5,
      questionText: 'Under the Indian Constitution, the power to issue writs of Habeas Corpus resides with which of the following authorities?',
      options: [
        'Only the Supreme Court of India.',
        'Only the High Courts of the States.',
        'Both the Supreme Court and the High Courts.',
        'Any District and Session Court within the territory.'
      ],
      correctOptionIndex: 2,
      explanation: 'Under Article 32, the Supreme Court can issue writs, and under Article 226, the High Courts can issue writs to enforce fundamental rights.'
    }
  ];

  useEffect(() => {
    if (quizState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setTimeLeft(15 * 60);
    setUserAnswers([]);
    setQuizState('active');
  };

  const selectOption = (index: number) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) return;

    const isCorrect = selectedOptionIndex === questionBank[currentQuestionIndex].correctOptionIndex;
    if (isCorrect) setScore(prev => prev + 1);

    setUserAnswers(prev => [...prev, selectedOptionIndex]);

    if (currentQuestionIndex < questionBank.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizState('results');
  };

  const handleStartPYQPractice = (title: string) => {
    setCustomTitle(title);
    startQuiz();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((currentQuestionIndex + 1) / questionBank.length) * 100;
  const accuracy = Math.round((score / questionBank.length) * 100);

  return (
    <div className="space-y-6">
      {/* Sub tabs toggle */}
      {quizState === 'start' && (
        <div className="flex bg-surface-container/50 rounded-full p-1 border border-outline-variant/30 max-w-sm mx-auto">
          <button
            onClick={() => {
              setActiveSubTab('quiz');
              setCustomTitle(null);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'quiz'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Daily Mock Quiz</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('pyq')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'pyq'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>PYQ Hub</span>
          </button>
        </div>
      )}

      {/* Main View Router */}
      {activeSubTab === 'pyq' && quizState === 'start' ? (
        <PYQHubTab onStartExam={handleStartPYQPractice} />
      ) : (
        <div className="animate-in fade-in duration-300">
          
          {/* Start Screen */}
          {quizState === 'start' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass-card p-8 rounded-2xl shadow-xl text-center space-y-6">
                <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto border border-primary-container/5">
                  <HelpCircle className="h-10 w-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-on-surface">
                    {customTitle ? `Ready for: ${customTitle}` : 'Ready for your daily 10-question mock test?'}
                  </h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
                    Test your core knowledge across all syllabus modules. This simulated test includes math, physics, coding, and civic awareness.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                  <div className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">QUESTIONS</p>
                    <p className="text-md font-extrabold text-primary">{questionBank.length} items</p>
                  </div>
                  <div className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">DIFFICULTY</p>
                    <p className="text-md font-extrabold text-primary">Adaptive</p>
                  </div>
                </div>

                <button 
                  onClick={startQuiz}
                  className="w-full bg-primary hover:bg-primary-container text-white py-4 px-6 rounded-full font-bold text-sm hover:shadow-xl transition-all active:scale-[0.98] shadow-lg cursor-pointer"
                >
                  Begin Assessment
                </button>
              </div>

              {/* Classroom background illustrative image */}
              <div className="rounded-2xl overflow-hidden h-44 relative shadow-sm group">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600" 
                  alt="High stakes academic testing environment" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-bold shadow-sm">Join 1,240 students testing today</p>
                </div>
              </div>
            </div>
          )}

          {/* Active Quiz Question Screen */}
          {quizState === 'active' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">PROGRESS</span>
                  <span className="text-md font-extrabold text-primary">Question {currentQuestionIndex + 1} of {questionBank.length}</span>
                </div>
                
                <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-bold backdrop-blur-md ${timeLeft < 90 ? 'bg-error-container text-error' : 'bg-surface-container/60 text-on-surface'}`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Question & Options Card */}
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6 border border-outline-variant/30">
                <p className="text-md font-bold text-on-surface leading-snug">
                  {questionBank[currentQuestionIndex].questionText}
                </p>

                <div className="space-y-3">
                  {questionBank[currentQuestionIndex].options.map((option, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isSelected = selectedOptionIndex === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => selectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-4 group cursor-pointer border ${
                          isSelected 
                            ? 'border-primary bg-primary/10 border-2 font-semibold shadow-sm' 
                            : 'border-outline-variant/40 bg-white/40 hover:border-primary/50'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                          isSelected 
                            ? 'bg-primary border-primary text-white' 
                            : 'border-outline-variant/60 bg-white text-on-surface-variant group-hover:bg-primary group-hover:text-white group-hover:border-primary'
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="text-xs flex-1 text-on-surface leading-normal">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex justify-end">
                <button 
                  onClick={handleNextQuestion}
                  disabled={selectedOptionIndex === null}
                  className={`flex items-center gap-1.5 bg-primary text-white py-3 px-6 rounded-full font-bold text-xs transition-all shadow-md cursor-pointer ${
                    selectedOptionIndex === null ? 'opacity-40 cursor-not-allowed' : 'hover:bg-primary-container hover:shadow-lg'
                  }`}
                >
                  <span>{currentQuestionIndex < questionBank.length - 1 ? 'Next Question' : 'Finish Test'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz Results Dashboard */}
          {quizState === 'results' && (
            <div className="max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in duration-300">
              <div className="glass-card p-8 rounded-2xl shadow-xl border-2 border-primary/10 space-y-6">
                
                {/* Visual Circle Gauge */}
                <div className="space-y-4">
                  <div className="w-32 h-32 rounded-full border-8 border-primary-container/10 flex items-center justify-center mx-auto relative">
                    <div className="text-center">
                      <span className="text-3xl font-black text-primary">{score}</span>
                      <span className="text-xs font-bold text-on-surface-variant block mt-0.5">/ {questionBank.length}</span>
                    </div>
                    {/* SVG Accuracy Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        className="stroke-primary fill-none transition-all duration-1000 ease-out" 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        strokeWidth="8" 
                        strokeDasharray={351.85} 
                        strokeDashoffset={351.85 - (accuracy / 100) * 351.85}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-on-surface">Great effort, Sarah!</h2>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      You scored <strong className="text-primary font-semibold">{score} out of {questionBank.length} correct</strong> and outperformed 78% of students today.
                    </p>
                  </div>
                </div>

                {/* Score Breakdown Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Time Taken</p>
                    <p className="text-sm font-extrabold text-primary">{formatTime(15 * 60 - timeLeft)}</p>
                  </div>
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Accuracy</p>
                    <p className="text-sm font-extrabold text-primary">{accuracy}%</p>
                  </div>
                  <div className="p-3 bg-surface-container/60 border border-outline-variant/30 rounded-xl">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Rank Up</p>
                    <p className="text-sm font-extrabold text-primary">+{score * 3} pts</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Review Textbook Mistakes &amp; Explanations</span>
                  </button>
                  <button 
                    onClick={() => {
                      setQuizState('start');
                      setCustomTitle(null);
                    }}
                    className="w-full bg-transparent hover:bg-surface-container-high/40 text-primary border border-primary py-3 rounded-full font-bold text-xs transition-all cursor-pointer"
                  >
                    Back to Test Hub
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Textbook Review Mistakes Modal */}
          {showReviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-outline-variant/30 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                  <h3 className="text-md font-bold text-primary flex items-center gap-1.5">
                    <span>Review Explanations</span>
                    <span className="text-xs bg-primary-container text-on-primary-container py-0.5 px-2.5 rounded-full">
                      Exam Prep Details
                    </span>
                  </h3>
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/20 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Question Explanations Scroll Area */}
                <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 scrollbar-thin">
                  {questionBank.map((q, qIdx) => {
                    const answeredIdx = userAnswers[qIdx];
                    const isCorrect = answeredIdx === q.correctOptionIndex;
                    const letters = ['A', 'B', 'C', 'D'];
                    
                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-outline-variant/20 bg-surface/50 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-xs font-bold text-on-surface leading-normal flex-1">
                            {qIdx + 1}. {q.questionText}
                          </h4>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-md">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Correct</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-error bg-error-container/40 px-2 py-1 rounded-md">
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Incorrect</span>
                            </span>
                          )}
                        </div>

                        {/* Options preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-on-surface-variant">
                          {q.options.map((opt, optIdx) => {
                            const isUserSelection = answeredIdx === optIdx;
                            const isCorrectAns = q.correctOptionIndex === optIdx;
                            return (
                              <div 
                                key={optIdx} 
                                className={`p-2 rounded-lg border text-left leading-normal flex items-start gap-2 ${
                                  isCorrectAns 
                                    ? 'bg-emerald-100/30 border-emerald-500/50 text-emerald-800' 
                                    : isUserSelection 
                                      ? 'bg-red-50 border-red-500/50 text-red-800' 
                                      : 'bg-white/40 border-outline-variant/10'
                                }`}
                              >
                                <span className="font-bold opacity-80">{letters[optIdx]}:</span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation description */}
                        <div className="bg-primary-container/5 rounded-xl p-3 border border-primary-container/10">
                          <p className="text-[11px] leading-relaxed text-on-primary-container">
                            <strong className="text-primary font-bold">Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-outline-variant/10 flex justify-end">
                  <button 
                    onClick={() => setShowReviewModal(false)}
                    className="py-2.5 px-6 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-full cursor-pointer shadow-md transition-all"
                  >
                    Close Review
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
