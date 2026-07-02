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
                Oct 24, 2023
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
                    The Union Cabinet approved the &lsquo;PM-Vidyalaxmi&rsquo; scheme to provide financial support to meritorious students for higher education.
                  </li>
                  <li>
                    India and Oman signed a Memorandum of Understanding (MoU) for cooperation in the field of Information Technology.
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
                    The 16th BRICS Summit concluded in Kazan, Russia, focusing on global security and economic cooperation.
                  </li>
                  <li>
                    FATF has removed several countries from its grey list following significant progress in AML/CFT measures.
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
                    India&apos;s junior archery team secured 3 Gold medals at the Asian Archery Championships held in Bangkok.
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
                onClick={() => handleDownload('oct', 'October 2023 Digest')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high transition-colors border border-outline-variant/30 text-left cursor-pointer text-xs"
              >
                <span className="font-bold text-on-surface">October 2023 Digest</span>
                <Download className={`h-4 w-4 ${downloaded === 'oct' ? 'text-emerald-600 animate-bounce' : 'text-primary'}`} />
              </button>

              <button 
                onClick={() => handleDownload('sep', 'September 2023 Digest')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container/30 hover:bg-surface-container-high transition-colors border border-outline-variant/30 text-left cursor-pointer text-xs"
              >
                <span className="font-semibold text-on-surface opacity-80">September 2023 Digest</span>
                <Download className={`h-4 w-4 ${downloaded === 'sep' ? 'text-emerald-600 animate-bounce' : 'text-outline'}`} />
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
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Upcoming Exam Alerts</span>
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3 items-start border-b border-outline-variant/20 pb-3">
                <div className="bg-on-tertiary-container/10 text-on-tertiary-container px-2.5 py-1.5 rounded-lg text-center min-w-[50px] border border-on-tertiary-container/10">
                  <p className="text-[10px] font-bold uppercase tracking-wide">Nov</p>
                  <p className="text-md font-extrabold leading-none mt-1">12</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">SSC CGL Tier II</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">General Awareness preparation due</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-primary-container/10 text-primary px-2.5 py-1.5 rounded-lg text-center min-w-[50px] border border-primary-container/10">
                  <p className="text-[10px] font-bold uppercase tracking-wide">Dec</p>
                  <p className="text-md font-extrabold leading-none mt-1">05</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">MPSC Prelims</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">State current affairs focus</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
