'use client';

import React from 'react';
import Link from 'next/link';

export function RxFooter() {
  return (
    <footer className="w-full bg-background border-t border-border pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
                <Link href="/ats-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/simple-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Simple Resume Builder
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
                <Link href="/btech-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  B.Tech Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/student-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Student Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/teacher-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Teacher Resume Builder
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
                <Link href="/resume-format-download" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Resume Format Download
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
                <Link href="/ai-resume-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  AI Bullet Re-writer
                </Link>
              </li>
              <li>
                <Link href="/ats-checker" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/resume-editor" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Live A4 Editor
                </Link>
              </li>
              <li>
                <Link href="/download-resume-free-pdf" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Free PDF Download
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Builder Alternatives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Company &amp; Legal
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
            </ul>
          </div>
        </div>

        {/* Directory Sections for Internal Link Architecture */}
        <div className="pt-10 pb-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Role-Specific Resume Examples
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px]">
              <Link href="/examples/software-engineer-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Software Engineer</Link>
              <Link href="/examples/frontend-developer-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Frontend Developer</Link>
              <Link href="/examples/backend-developer-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Backend Developer</Link>
              <Link href="/examples/data-analyst-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Data Analyst</Link>
              <Link href="/examples/btech-fresher-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">B.Tech Fresher</Link>
              <Link href="/examples/mechanical-engineer-fresher-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Mechanical Engineer</Link>
              <Link href="/examples/fresher-resume-india" className="hover:text-emerald-700 dark:hover:text-emerald-400">Fresher India</Link>
              <Link href="/examples/bca-fresher-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">BCA Fresher</Link>
              <Link href="/examples/bcom-fresher-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">B.Com Fresher</Link>
              <Link href="/examples/accountant-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Senior Accountant</Link>
              <Link href="/examples/mba-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">MBA &amp; Product</Link>
              <Link href="/examples/digital-marketing-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Digital Marketing</Link>
              <Link href="/examples/sales-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Sales Executive</Link>
              <Link href="/examples/hr-resume" className="hover:text-emerald-700 dark:hover:text-emerald-400">HR Executive</Link>
              <Link href="/examples/naukri-resume-format" className="hover:text-emerald-700 dark:hover:text-emerald-400">Naukri Format</Link>
              <Link href="/examples/cgpa-resume-format" className="hover:text-emerald-700 dark:hover:text-emerald-400">CGPA Format</Link>
            </div>
          </div>

          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 dark:text-white font-bold block mb-3">
              Builder Comparisons &amp; Free Alternatives
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px]">
              <Link href="/alternatives/zety" className="hover:text-emerald-700 dark:hover:text-emerald-400">Zety Alternative</Link>
              <Link href="/alternatives/canva" className="hover:text-emerald-700 dark:hover:text-emerald-400">Canva Alternative</Link>
              <Link href="/alternatives/teal" className="hover:text-emerald-700 dark:hover:text-emerald-400">Teal Alternative</Link>
              <Link href="/alternatives/indeed" className="hover:text-emerald-700 dark:hover:text-emerald-400">Indeed Alternative</Link>
              <Link href="/alternatives/livecareer" className="hover:text-emerald-700 dark:hover:text-emerald-400">LiveCareer Alternative</Link>
              <Link href="/alternatives/novoresume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Novorésumé Alternative</Link>
              <Link href="/alternatives/kickresume" className="hover:text-emerald-700 dark:hover:text-emerald-400">Kickresume Alternative</Link>
              <Link href="/alternatives/flowcv" className="hover:text-emerald-700 dark:hover:text-emerald-400">FlowCV Alternative</Link>
              <Link href="/alternatives/naukri" className="hover:text-emerald-700 dark:hover:text-emerald-400">Naukri Alternative</Link>
            </div>
          </div>
        </div>

        {/* Massive Bold "ResumeBabu" Watermark */}
        <div className="pt-8 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900/10 dark:text-white/10 select-none">
            ResumeBabu
          </span>
          <span className="font-mono mt-4 sm:mt-0 text-[11px]">
            &copy; {new Date().getFullYear()} ResumeBabu Inc. &bull; Engineered for career acceleration
          </span>
        </div>
      </div>
    </footer>
  );
}
