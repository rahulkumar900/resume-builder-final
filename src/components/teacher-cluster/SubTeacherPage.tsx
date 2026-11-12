'use client';

import React from 'react';
import Link from 'next/link';
import { Check, CheckCircle2, ChevronRight, School } from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { SubPageData } from '@/data/teacher-cluster/subpages';
import {
  CreateTeacherResumeButton,
  TeacherResumePreviewBox,
  CopySnippetBox,
  TeacherClusterLinks,
} from './TeacherClusterHelpers';

export function SubTeacherPage({ data }: { data: SubPageData }) {
  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-12 pb-14 sm:pt-20 sm:pb-18 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5 font-mono">
              <Link href="/resume-for-teacher-job" className="hover:text-emerald-700 dark:hover:text-emerald-400">
                Teacher Resume
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold">{data.badge}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium mb-4">
              <School className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {data.h1}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {data.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <CreateTeacherResumeButton
                sample={data.sample}
                label={data.primaryCtaText}
                className="w-full sm:w-auto"
              />
              <a
                href="#sample-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-secondary text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition border border-border"
              >
                View Sample Resume
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              {['ATS-friendly layout', 'Instant PDF & Word (.doc)', '100% Free to edit'].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{b}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLETE SAMPLE RESUME NEAR THE TOP */}
        <section id="sample-resume" className="py-14 sm:py-18 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
          <TeacherResumePreviewBox
            sample={data.sample}
            badge={data.badge}
            title={data.sampleTitle}
            description={data.sampleDescription}
          />
        </section>

        {/* ROLE-SPECIFIC GUIDE SECTIONS */}
        <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-12">
          {data.sections.map((sec) => (
            <div key={sec.heading} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {sec.body}
              </p>

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {sec.bullets.map((b, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.copyableSnippet && (
                <CopySnippetBox
                  label={sec.copyableSnippet.label}
                  text={sec.copyableSnippet.text}
                />
              )}

              {sec.copyableSnippets && sec.copyableSnippets.length > 0 && (
                <div className="space-y-3">
                  {sec.copyableSnippets.map((snip) => (
                    <CopySnippetBox key={snip.label} label={snip.label} text={snip.text} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* SKILLS FOR THIS ROLE */}
          <div className="pt-6 border-t border-border">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Essential Skills to Include
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skillsGrouped.map((grp) => (
                <div key={grp.group} className="bg-card rounded-2xl border border-border p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{grp.group}</h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {grp.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {data.faqs.map((faq) => (
              <div key={faq.question} className="pb-5 border-b border-border last:border-b-0">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CLUSTER LINKS */}
        <TeacherClusterLinks currentPath={data.path} />

        {/* FINAL CTA */}
        <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-slate-50 dark:bg-[#161512] border border-border p-8 sm:p-12 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {data.ctaTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
              {data.ctaSubtitle}
            </p>
            <CreateTeacherResumeButton sample={data.sample} label={data.primaryCtaText} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
