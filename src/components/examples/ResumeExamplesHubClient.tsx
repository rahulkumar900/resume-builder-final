'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { RESUME_EXAMPLES } from '@/lib/examples-data';

export function ResumeExamplesHubClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'fresher' | 'data' | 'business' | 'finance' | 'marketing'>('all');

  const filtered = useMemo(() => {
    return RESUME_EXAMPLES.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.targetKeywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#100F0C] flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-transparent border-b border-black/[0.06] dark:border-white/[0.08] py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Recruiter-Approved &amp; ATS-Screened Examples
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Resume Examples for Top Tech &amp; Business Roles
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Browse authentic, high-scoring resume examples engineered for modern ATS parsers (Workday, Greenhouse, Taleo, and Naukri). Inspect proven STAR bullet points, keywords, and 1-click editable templates.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, keyword (e.g. B.Tech, React, Tally, Java, Sales)..."
                className="w-full pl-11 pr-4 py-3 bg-white/90 dark:bg-[#161614] hover:bg-white focus:bg-white dark:focus:bg-[#1c1c1a] border border-black/[0.08] dark:border-white/[0.1] rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Category Filters Bar */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: `All Examples (${RESUME_EXAMPLES.length})` },
              { id: 'tech', label: 'Tech & Engineering' },
              { id: 'fresher', label: 'Freshers & Campus' },
              { id: 'data', label: 'Data & Analytics' },
              { id: 'business', label: 'Product & Business' },
              { id: 'finance', label: 'Finance & Accounts' },
              { id: 'marketing', label: 'Marketing & Growth' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-700 dark:bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white/80 dark:bg-[#161614] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/[0.06] dark:border-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Link
            href="/create"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>+ Build From Scratch</span>
          </Link>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.slug}
              className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      {item.experienceLevel}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 font-serif">
                      {item.role}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {item.metaDescription}
                </p>

                {/* Key Skills Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target ATS Keywords:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.targetKeywords.slice(0, 5).map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60"
                      >
                        {kw}
                      </span>
                    ))}
                    {item.targetKeywords.length > 5 && (
                      <span className="text-[10px] font-bold text-slate-400 self-center">
                        +{item.targetKeywords.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between gap-2">
                <Link
                  href={`/examples/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
                >
                  <span>View Example &amp; Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    router.push(`/create?template=${item.recommendedTemplate}&targetRole=${encodeURIComponent(item.role)}`);
                  }}
                  className="px-3 py-1.5 bg-white dark:bg-[#20201e] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 font-semibold text-xs rounded-lg border border-black/[0.08] dark:border-white/[0.08] shadow-2xs transition-all cursor-pointer"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Educational Guide Block */}
        <section className="mt-16 bg-white/90 dark:bg-[#161614] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-8 sm:p-10 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Candidate Knowledge Base
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              How to Tailor Your Resume for Indian &amp; Global Hiring
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                1-Page vs 2-Page Rule
              </h3>
              <p>
                Freshers, college graduates (B.Tech, BCA, MCA, B.Com), and candidates with under 5 years of experience should strictly stick to a 1-page A4 format. Senior engineers, tech leads, and managers with multi-team delivery can comfortably use a structured 2-page format.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                The Google X-Y-Z Formula
              </h3>
              <p>
                Recruiters skip bullet points that read like daily job duties. Frame your accomplishments as: <em>&quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;</em>. For example: <em>&quot;Reduced p99 query latency by 44% by implementing Redis multi-tier caching.&quot;</em>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ATS Keyword Density
              </h3>
              <p>
                Applicant Tracking Systems parse your resume for exact job description keywords. Organize technical tools into clear semantic categories (Languages, Frameworks, Databases, Cloud) instead of long unformatted paragraphs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
