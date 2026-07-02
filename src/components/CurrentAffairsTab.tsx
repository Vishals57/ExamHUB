import React, { useState } from 'react';
import { Calendar, Download, Bookmark, FileText, Bell, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CurrentAffairsTab() {
  const [bookmarked, setBookmarked] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const handleDownload = (id: string, name: string) => {
    setDownloaded(id);
    setTimeout(() => {
      setDownloaded(null);
      alert(`Success: "${name}" started downloading!`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <section className="space-y-1">
        <h2 className="text-2xl font-extrabold text-primary">Current Affairs Digest</h2>
        <p className="text-sm text-on-surface-variant max-w-2xl leading-normal">
          Your daily concentrated briefing for competitive examinations (SSC, MPSC, UPSC). Updated every morning at 06:00 AM.
        </p>
      </section>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Daily Highlights Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 border-l-4 border-primary shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="text-md font-bold text-primary">Daily Highlights</h3>
              </div>
              <span className="bg-primary-container text-on-primary-container text-[11px] font-bold px-3 py-1 rounded-full border border-primary-container/20">
                July 02, 2026
              </span>
            </div>

            <div className="space-y-6">
              {/* National */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">National</h4>
                </div>
                <ul className="space-y-2.5 pl-4 list-disc text-sm text-on-surface leading-normal">
                  <li>
                    The Union Ministry of Education launched the &lsquo;PM-Vidyalaxmi&rsquo; Phase-II platform to fully digitize interest subvention for higher education loans.
                  </li>
                  <li>
                    India and Oman successfully signed a comprehensive Bilateral Economic Partnership agreement to accelerate collaborative IT projects and semiconductor supply chains.
                  </li>
                </ul>
              </div>

              {/* International */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                  <h4 className="text-xs font-bold text-tertiary-container uppercase tracking-wider">International</h4>
                </div>
                <ul className="space-y-2.5 pl-4 list-disc text-sm text-on-surface leading-normal">
                  <li>
                    The 18th G20 Sherpa Meet concluded with unanimous focus on global climate-finance targets and AI ethics guidelines.
                  </li>
                  <li>
                    FATF officially announced the exclusion of three South Asian and African countries from its grey monitoring list following major updates in anti-money laundering mechanisms.
                  </li>
                </ul>
              </div>

              {/* Sports */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
                  <h4 className="text-xs font-bold text-on-tertiary-container uppercase tracking-wider">Sports</h4>
                </div>
                <ul className="space-y-2.5 pl-4 list-disc text-sm text-on-surface leading-normal">
                  <li>
                    India&apos;s junior athletic team secured the highest-ever gold tally of 5 medals at the Asian Junior Track &amp; Field Championships in Bangkok.
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full py-3 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <span>View Full Article</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Monthly Magazine PDFs */}
          <div className="glass-card rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-fixed-dim/30 rounded-xl text-primary border border-primary-fixed-dim/20">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-primary">Monthly Magazine</h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Download the comprehensive current affairs PDFs compiled by educators for offline revision.
            </p>

            <div className="space-y-2">
              <button 
                onClick={() => handleDownload('june_26', 'June 2026 Digest')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-colors border border-outline-variant/30 text-left cursor-pointer text-xs"
              >
                <span className="font-bold text-on-surface">June 2026 Digest</span>
                <Download className={`h-4 w-4 ${downloaded === 'june_26' ? 'text-emerald-600 animate-bounce' : 'text-primary'}`} />
              </button>

              <button 
                onClick={() => handleDownload('may_26', 'May 2026 Digest')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container/30 hover:bg-surface-container-high transition-colors border border-outline-variant/30 text-left cursor-pointer text-xs"
              >
                <span className="font-semibold text-on-surface opacity-80">May 2026 Digest</span>
                <Download className={`h-4 w-4 ${downloaded === 'may_26' ? 'text-emerald-600 animate-bounce' : 'text-outline'}`} />
              </button>
            </div>
          </div>

          {/* GK Quick Fact Card */}
          <div className="bg-primary-container text-white rounded-2xl p-5 shadow-lg border border-primary/20 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-ping" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-primary-container">GK Quick Fact</h3>
            </div>
            
            <div className="bg-primary/30 rounded-xl p-4 border border-white/5">
              <p className="text-sm italic leading-relaxed text-on-primary-container">
                &ldquo;Article 324 of the Indian Constitution provides for the power of superintendence, direction, and control of elections to be vested in an Election Commission.&rdquo;
              </p>
            </div>

            <div className="flex justify-between items-center text-xs opacity-90">
              <span className="font-semibold text-on-primary-container">Topic: Polity</span>
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className="hover:scale-110 transition-transform cursor-pointer"
                aria-label="Bookmark fact"
              >
                <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-amber-400 text-amber-400' : 'text-on-primary-container'}`} />
              </button>
            </div>
          </div>

          {/* Exam Alert Notifications */}
          <div className="glass-card rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <Bell className="h-4 w-4 animate-swing" />
                <span>Upcoming Exam Alerts (2026)</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live Status
              </span>
            </div>

            <div className="space-y-4">
              {/* MPSC Rajyaseva */}
              <div className="flex gap-3 items-start border-b border-outline-variant/20 pb-3">
                <div className="bg-primary-container/20 text-primary px-2.5 py-1.5 rounded-lg text-center min-w-[55px] border border-primary-container/20">
                  <p className="text-[10px] font-bold uppercase tracking-wide">Aug</p>
                  <p className="text-md font-extrabold leading-none mt-1">23</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-on-surface truncate">MPSC State Services (Prelims)</h4>
                    <span className="shrink-0 text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 px-1.5 py-0.5 rounded">
                      52 days left
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                    Focus on Maharashtra history, social reformers, geography, and GS paper-1 state specifics.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">Revision Phase Active</span>
                  </div>
                </div>
              </div>

              {/* SSC CGL Tier I */}
              <div className="flex gap-3 items-start border-b border-outline-variant/20 pb-3">
                <div className="bg-on-tertiary-container/10 text-on-tertiary-container px-2.5 py-1.5 rounded-lg text-center min-w-[55px] border border-on-tertiary-container/10">
                  <p className="text-[10px] font-bold uppercase tracking-wide">Sep</p>
                  <p className="text-md font-extrabold leading-none mt-1">10</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-on-surface truncate">SSC CGL 2026 (Tier I)</h4>
                    <span className="shrink-0 text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                      70 days left
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                    Math speed-sprint practice recommended. Solve standard 25-question topic mock assessments.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Application Status Released</span>
                  </div>
                </div>
              </div>

              {/* UPSC Civil Services Mains */}
              <div className="flex gap-3 items-start">
                <div className="bg-secondary-container/20 text-secondary px-2.5 py-1.5 rounded-lg text-center min-w-[55px] border border-secondary-container/20">
                  <p className="text-[10px] font-bold uppercase tracking-wide">Sep</p>
                  <p className="text-md font-extrabold leading-none mt-1">18</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-on-surface truncate">UPSC Civil Services (Mains)</h4>
                    <span className="shrink-0 text-[9px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 px-1.5 py-0.5 rounded">
                      78 days left
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                    Descriptive answer writing evaluation focus. Study daily GS and Optional subjects.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300">DAF-I Form Registration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
