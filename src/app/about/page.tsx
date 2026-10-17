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
  title: 'About Us & Mission | ResumeBuilder',
  description:
    'Learn about ResumeBuilder. We are on a mission to democratize job interview access with ATS-engineered resumes, responsible AI, and 100% free vector PDF downloads.',
  alternates: {
    canonical: 'https://resumebuilder.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-w-[320px] bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Our Purpose &amp; Story</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Democratizing career opportunities with ATS precision.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We started ResumeBuilder with a simple belief: qualified job seekers should never get rejected simply because of broken formatting, opaque ATS bots, or paywalls holding PDFs hostage.
            </p>
          </div>

          {/* Key Metric Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="bg-white dark:bg-[#191815] p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">50,000+</div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Resumes Crafted</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">By candidates worldwide</div>
            </div>
            <div className="bg-white dark:bg-[#191815] p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">98.4%</div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">ATS Pass Rate</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">Tested across major scanners</div>
            </div>
            <div className="bg-white dark:bg-[#191815] p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">30+</div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Recruiter Layouts</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">From FAANG to campus TPO</div>
            </div>
            <div className="bg-white dark:bg-[#191815] p-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">₹0</div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Ransom Paywalls</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500">Vector PDF exports are free</div>
            </div>
          </div>

          {/* The Problem We Solved (Why Traditional Builders Fail) */}
          <div className="bg-white dark:bg-[#191815] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-8 sm:p-12 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">The Problem</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Why most resumes fail before reaching a human recruiter.
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every month, millions of applicants apply to jobs online. Over 75% of those resumes are filtered out automatically by Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, Lever, and Naukri. Why?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1F1E1A] border border-slate-200/70 dark:border-white/[0.06] space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white text-sm">❌ Broken Graphic Columns</div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Design tools like Canva generate image-based or complex floating divs that ATS parsers read scrambled or out of chronological order.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1F1E1A] border border-slate-200/70 dark:border-white/[0.06] space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white text-sm">❌ Watermark Ransom Paywalls</div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Legacy resume sites let you spend 45 minutes typing, then block your download with a sneaky &quot;$2.99 trial that renews at $39.99/mo&quot; paywall.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1F1E1A] border border-slate-200/70 dark:border-white/[0.06] space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white text-sm">❌ Blind Keyword Guessing</div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Candidates submit generic one-size-fits-all resumes that miss critical skills highlighted in the job description.
                </p>
              </div>
            </div>
          </div>

          {/* Our Engineering Solution (Core Pillars) */}
          <div className="space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Our Solution</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                How ResumeBuilder changes the game.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#191815] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. ATS Engineering First</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every template in our library is rigorously benchmarked against the parsing algorithms of major enterprise ATS software. Our semantic single- and dual-column layouts ensure 100% text readability.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#191815] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Interactive Job Tailoring</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instead of sending generic resumes, our playground extracts keywords directly from your target job description, pinpointing missing technical skills and recommending high-impact adjustments.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#191815] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. 100% Free Vector PDF Downloads</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We believe basic access to a professional resume is a right, not a luxury. Create, edit, and download crisp, watermark-free vector PDFs without ever entering a credit card.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#191815] border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">4. Tailored for Every Career Stage</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  From Indian campus placement rules (TPO cell compliance, 10th/12th/CGPA tables) to Wall Street Ivy League standards and Silicon Valley tech formats, we support candidates at all milestones.
                </p>
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-blue-500/20 dark:border-white/[0.08]">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Ready to create a resume that gets you hired?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Join tens of thousands of software engineers, analysts, college freshers, and professionals who have built winning resumes with us.
            </p>
            <div className="pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-emerald-900 font-black text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Build My Resume — Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
