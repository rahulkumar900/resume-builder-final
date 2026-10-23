import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import {
  Sparkles,
  ShieldCheck,
  Target,
  FileText,
  CheckCircle2,
  ArrowRight,
  Zap,
  Users,
  Award,
  Layers,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Mission',
  description:
    'Learn about ResumeBuilder. We are on a mission to democratize job interview access with ATS-engineered resumes, responsible AI, and 100% free vector PDF downloads.',
  openGraph: {
    title: 'About Us & Mission | ResumeBuilder',
    description:
      'Democratizing job interview access with ATS-engineered resumes, responsible AI, and 100% free vector PDF downloads.',
    type: 'website',
    url: 'https://resumebabu.com/about',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us & Mission | ResumeBuilder',
    description:
      'Democratizing job interview access with ATS-engineered resumes, responsible AI, and 100% free vector PDF downloads.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/about',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://resumebabu.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://resumebabu.com/about',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-36">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Our Purpose &amp; Story</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Democratizing career opportunities with{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">ATS precision</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              We started ResumeBuilder with a simple belief: qualified job seekers should never get rejected simply because of broken formatting, opaque ATS bots, or paywalls holding PDFs hostage.
            </p>

            {/* Key Metric Stats Strip */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-400">50,000+</div>
                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Resumes Crafted</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">By candidates worldwide</div>
              </div>
              <div className="bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">98.4%</div>
                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">ATS Pass Rate</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Tested across major scanners</div>
              </div>
              <div className="bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-400">30+</div>
                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Recruiter Layouts</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">From FAANG to campus TPO</div>
              </div>
              <div className="bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-400">₹0</div>
                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">Ransom Paywalls</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Vector PDF exports are free</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem We Solved */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="bg-card/90 backdrop-blur-xs rounded-3xl border border-border p-8 sm:p-14 shadow-xs space-y-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-semibold block mb-2">
                The Problem
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Why most resumes fail before reaching a human recruiter<span className="text-rose-600 dark:text-rose-400">.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Every month, millions of applicants apply to jobs online. Over 75% of those resumes are filtered out automatically by Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, Lever, and Naukri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#161512] border border-border space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-base">Broken Graphic Columns</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Design tools like Canva generate image-based or complex floating divs that ATS parsers read scrambled or out of chronological order.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#161512] border border-border space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-base">Watermark Ransom Paywalls</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Legacy resume sites let you spend 45 minutes typing, then block your download with a sneaky &quot;$2.99 trial that renews at $39.99/mo&quot; paywall.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#161512] border border-border space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-base">Blind Keyword Guessing</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Candidates submit generic one-size-fits-all resumes that miss critical skills highlighted in the job description.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Engineering Solution (Core Pillars) */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Our Solution
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              How ResumeBuilder changes the game<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-8 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. ATS Engineering First</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every template in our library is rigorously benchmarked against the parsing algorithms of major enterprise ATS software. Our semantic single- and dual-column layouts ensure 100% text readability.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Interactive Job Tailoring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Instead of sending generic resumes, our playground extracts keywords directly from your target job description, pinpointing missing technical skills and recommending high-impact adjustments.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. 100% Free Vector PDF Downloads</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe basic access to a professional resume is a right, not a luxury. Create, edit, and download crisp, watermark-free vector PDFs without ever entering a credit card.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">4. Tailored for Every Career Stage</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                From Indian campus placement rules (TPO cell compliance, 10th/12th/CGPA tables) to Wall Street Ivy League standards and Silicon Valley tech formats, we support candidates at all milestones.
              </p>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Ready to create a resume that gets you hired<span className="text-emerald-700 dark:text-emerald-400">?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join tens of thousands of software engineers, analysts, college freshers, and professionals who have built winning resumes with us.
            </p>
            <div className="flex justify-center">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <span>Build My Resume — Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
