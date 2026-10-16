import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { FileQuestion, ArrowRight, Home, Sparkles, LayoutTemplate, Briefcase } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none -z-10 rounded-full bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(191,219,254,0.3),rgba(255,255,255,0))]" />

        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            <FileQuestion className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              404 Error
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
              The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track to building your resume.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Build Resume</span>
            </Link>
          </div>

          {/* Quick Helpful Links */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link
              href="/templates"
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-400 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <LayoutTemplate className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Explore Templates</div>
                  <div className="text-[11px] text-slate-500">Curated ATS-friendly formats</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-700 transition-all" />
            </Link>

            <Link
              href="/dashboard"
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-400 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="text-xs font-bold text-slate-900">My Dashboard</div>
                  <div className="text-[11px] text-slate-500">Access saved resumes</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-700 transition-all" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
