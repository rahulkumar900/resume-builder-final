'use client';

import React from 'react';
import Link from 'next/link';

export function RxFooter() {
  return (
    <footer className="w-full bg-background border-t border-border pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 text-xs text-slate-600 dark:text-slate-400 font-sans">
          {/* Templates & Layouts Hub */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Templates &amp; Formats
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  All 50+ Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/templates/ats-friendly" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  ATS Single-Column Templates
                </Link>
              </li>
              <li>
                <Link href="/resume-builder-for-freshers" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Fresher &amp; Campus Placement
                </Link>
              </li>
              <li>
                <Link href="/btech-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  B.Tech Engineering Format
                </Link>
              </li>
              <li>
                <Link href="/student-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  College Student Resume
                </Link>
              </li>
              <li>
                <Link href="/teacher-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Academic &amp; Teacher Resume
                </Link>
              </li>
              <li>
                <Link href="/free-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Free Resume Builder Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Career Tools Hub */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Tools &amp; Evaluator
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/ats-checker" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Free ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/ai-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  AI Resume Builder &amp; Rewriter
                </Link>
              </li>
              <li>
                <Link href="/resume-editor" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Live A4 Studio Editor
                </Link>
              </li>
              <li>
                <Link href="/download-resume-free-pdf" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Instant Vector PDF Export
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Resume Builder Comparisons
                </Link>
              </li>
              <li>
                <Link href="/alternatives/zety" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Free Zety Alternative
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Role Examples */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Role Examples
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/examples/software-engineer-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Software Engineer Resume
                </Link>
              </li>
              <li>
                <Link href="/examples/frontend-developer-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Frontend Developer Resume
                </Link>
              </li>
              <li>
                <Link href="/examples/data-analyst-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Data Analyst Resume
                </Link>
              </li>
              <li>
                <Link href="/examples/btech-fresher-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  B.Tech Fresher Resume
                </Link>
              </li>
              <li>
                <Link href="/examples/naukri-resume-format" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Naukri-Compliant Format
                </Link>
              </li>
              <li>
                <Link href="/examples" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                  All 16+ Resume Examples &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company, Trust & Support */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Trust &amp; Governance
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  About ResumeBabu &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Resume Advice &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy &amp; Storage
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@resumebabu.com" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900/15 dark:text-white/15 select-none">
            ResumeBabu
          </span>
          <span className="font-mono mt-4 sm:mt-0 text-[11px] text-center sm:text-right">
            &copy; {new Date().getFullYear()} ResumeBabu &bull; 100% Free ATS Resume Builder &bull; Zero Paywalls
          </span>
        </div>
      </div>
    </footer>
  );
}
