'use client';

import React from 'react';
import Link from 'next/link';

export function RxFooter() {
  return (
    <footer className="w-full bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 text-xs text-slate-600 dark:text-slate-400 font-sans">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Resume Studio
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/free-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Free Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/resume-maker" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Online Resume Maker
                </Link>
              </li>
              <li>
                <Link href="/resume-builder-for-freshers" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Resume for Freshers
                </Link>
              </li>
              <li>
                <Link href="/cv-maker" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  CV Maker Online
                </Link>
              </li>
              <li>
                <Link href="/templates/ats-friendly" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  ATS Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Resume Examples
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Career Tools
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  AI Bullet Re-writer
                </Link>
              </li>
              <li>
                <Link href="/ats-checker" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Job Description Matcher
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Live A4 Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Cloud Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Company
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Guides &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Trust &amp; Legal
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">SOC-2 &amp; GDPR Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive Bold "ResumeBuilder" Watermark */}
        <div className="pt-8 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900/10 dark:text-white/10 select-none">
            ResumeBuilder
          </span>
          <span className="font-mono mt-4 sm:mt-0 text-[11px]">
            &copy; {new Date().getFullYear()} ResumeBuilder Inc. &bull; Engineered for career acceleration
          </span>
        </div>
      </div>
    </footer>
  );
}
