import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  Code2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  Award,
  ShieldCheck,
  Star,
  Terminal,
  Cpu,
  Laptop,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'B.Tech Resume Builder - Engineering Freshers & CSE Placements',
  description:
    'Free B.Tech resume builder for engineering freshers and Computer Science students. Campus placement formats for TCS, Infosys, Wipro, and product companies. 100% free vector PDF download.',
  keywords: [
    'btech resume builder',
    'resume format for btech cse freshers',
    'btech fresher resume format',
    'engineering resume format',
    'software engineer resume format',
    'tcs resume format',
    'infosys resume format for freshers',
    'btech cse resume builder online free',
    'resume builder for engineering students',
    'campus placement resume builder',
    'btech it resume format',
    'resume format for freshers 12th pass engineering'
  ],
  openGraph: {
    title: 'B.Tech Resume Builder - Campus Placement Ready Engineering Formats',
    description:
      'Land your first software engineering or campus placement job. Pre-structured sections for CGPA, coding profiles (GitHub, LeetCode), and capstone projects.',
    type: 'website',
    url: 'https://resumebuilder.app/btech-resume-builder',
    images: [
      {
        url: 'https://resumebuilder.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'B.Tech Resume Builder - ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B.Tech Resume Builder - Campus Placement Ready Engineering Formats',
    description:
      'Land your first software engineering or campus placement job. Pre-structured sections for CGPA, coding profiles (GitHub, LeetCode), and capstone projects.',
    images: ['https://resumebuilder.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebuilder.app/btech-resume-builder',
  },
};

export default function BTechResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder B.Tech & Engineering Resume Maker',
    description:
      'Specialized resume maker calibrated for B.Tech, B.E., and MCA engineering students and freshers applying for campus placements and off-campus tech roles.',
    url: 'https://resumebuilder.app/btech-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '5840',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Campus placement formats compliant with TCS, Infosys, Wipro, and Cognizant',
      'Dedicated GitHub, LeetCode, and HackerRank profile integrations',
      'Pre-formatted academic project and capstone matrices',
      'Free vector PDF download with zero watermarks',
      'A4 single-page fit protection',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://resumebuilder.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'B.Tech Resume Builder',
        item: 'https://resumebuilder.app/btech-resume-builder',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best resume format for B.Tech CSE freshers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For Computer Science engineering freshers, the best format places Education and Technical Skills right at the top, followed immediately by Academic Projects and Coding Profiles (GitHub, LeetCode). Our Fresher and Naukri templates are pre-structured with this exact hierarchy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should B.Tech students include 10th and 12th marks on their resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For Indian campus placements (TCS, Infosys, Wipro, Accenture), recruiters explicitly check 60% or 6.0 CGPA criteria across 10th, 12th/Diploma, and B.Tech. For off-campus tech startups and international remote jobs, you only need to list your college degree and CGPA.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I describe projects if I have no corporate internship experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the Google X-Y-Z formula: "Built [Project Name] using [Tech Stack] that accomplished [Goal], solving [Problem]." Always include a live demo link or GitHub repository link so interviewers can verify your code.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will this resume pass TCS NQT, Infosys, and Cognizant screening?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our engineering layouts are strictly ATS-compliant, using standard HTML heading tags and vector typography that parse accurately in Taleo, iCIMS, and proprietary Indian placement recruitment portals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this B.Tech resume builder free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free. You can build, customize, and download high-resolution vector PDF resumes with zero payment, zero watermarks, and no sign-up trial paywalls.',
        },
      },
    ],
  };

  const engineeringTemplates = TEMPLATES.filter((t) =>
    ['fresher', 'naukri', 'ats', 'minimalist', 'classic'].includes(t.id)
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Campus Placement &amp; Off-Campus IT Approved</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              B.Tech Resume Builder:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Crack Campus Placements &amp; SDE Roles
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Designed specifically for engineering students and CSE freshers. Highlight your CGPA, coding profiles, full-stack projects, and hackathons with zero paywalls.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build B.Tech Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/examples"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>View Engineering Examples</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>TCS, Infosys &amp; Wipro Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>GitHub &amp; LeetCode Profile Badges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Academic Project Showcase</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free Vector PDF</span>
              </div>
            </div>
          </div>
        </section>

        {/* Both Placement Worlds: Service MNCs vs Product Companies */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Dual Placement Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                One Builder for Campus &amp; Product Hiring<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-3 font-sans">
                Different recruiters look for completely different signals. Our builder accommodates both seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service MNCs Card */}
              <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Mass Campus Placements</h3>
                      <span className="text-xs font-mono text-blue-700 dark:text-blue-400 font-medium">TCS, Infosys, Wipro, Cognizant, Accenture</span>
                    </div>
                  </div>
                  <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Rigid CGPA &amp; Percentage Matrix:</strong> Clear breakdown of 10th (CBSE/ICSE/State), 12th/Diploma, and B.Tech semester aggregate.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Standard Section Labels:</strong> Pre-programmed with orthodox section names required by campus placement cells.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Strict Single-Page Discipline:</strong> Eliminates accidental page-breaks during bulk placement office printouts.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/builder?template=naukri"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
                  >
                    <span>Use Campus Placement Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Product Companies & Startups */}
              <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Product Companies &amp; Startups</h3>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">Amazon, Microsoft, Swiggy, Uber, Startups</span>
                    </div>
                  </div>
                  <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Code &amp; Problem Solving Signals:</strong> Live clickable links to GitHub repos, LeetCode (e.g. 500+ problems solved, Knight/Guardian), Codeforces.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Deep Capstone Architecture:</strong> Highlight full-stack, distributed systems, machine learning, or microservice projects with live deployments.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Modern Clean Typography:</strong> Executive aesthetic matching Silicon Valley and Bengaluru engineering standards.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/builder?template=fresher"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
                  >
                    <span>Use Product Engineering Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The 5 Key Sections of a B.Tech Resume */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Engineering Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              5 Sections Every B.Tech Fresher Resume Must Have<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-3 font-sans">
              How to organize your college career when you have limited full-time work experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Education &amp; CGPA Matrix</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                List your B.Tech Degree, Branch (CSE, IT, ECE, Mechanical), University, CGPA, and expected graduation year.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Grouped Technical Stack</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Group skills into: Languages (C++, Java, Python), Web (React, Node.js), Databases (PostgreSQL, MongoDB), and Tools (Git, Linux, Docker).
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Capstone &amp; Major Projects</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Include 2–3 substantial projects with live demo URLs, GitHub repository links, and metrics (e.g. &ldquo;Handled 500+ requests/sec with Redis caching&rdquo;).
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                04
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Coding Profiles &amp; CP</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Highlight your LeetCode problem count, CodeChef stars, HackerRank badges, or Smart India Hackathon participation.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                05
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Internships &amp; Training</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Summer internships, industrial training, open-source contributions (GSoC, Hacktoberfest), or college tech club leadership.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition">
              <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-xs mb-4">
                06
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">Automated A4 Single Page Fit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Our GhostDOM engine ensures all 5 sections fit onto exactly 1 standard A4 page with zero blank page spillover.
              </p>
            </div>
          </div>
        </section>

        {/* Engineering Templates Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Recruiter Calibrated
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                B.Tech &amp; Engineering Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Pre-configured layouts ready to fill out in 3 minutes.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
            >
              <span>View all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 hover:border-emerald-500/40 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {tpl.id === 'fresher' ? 'Campus Favorite' : 'Placement Ready'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">{tpl.description}</p>

                  <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-black/[0.02] dark:bg-white/[0.04] rounded-xl p-3.5 border border-border mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Layout Format:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">
                        {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Best For:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">B.Tech, B.E., MCA, BCA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
                  >
                    <span>Use {tpl.name} Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Questions for B.Tech Freshers<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  What if my CGPA is below 7.0? Should I still mention it?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  For mass campus recruitment (TCS, Infosys, Wipro), eligibility criteria usually mandate at least 60% or 6.0 CGPA. If your CGPA meets the cutoff, list it clearly. If you are applying to off-campus product companies and your projects/skills are stronger than your academic grades, you can choose to omit your CGPA and highlight your GitHub repos and technical achievements instead.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  How many projects should a B.Tech CSE fresher include?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  Include 2 to 3 high-quality projects rather than 6 basic tutorial clones (like simple to-do lists). Prioritize projects that involve database design, user authentication, REST APIs, or third-party integrations with a live deployed URL on Vercel, Render, or GitHub Pages.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Can non-CS students (ECE, Mechanical, Civil) use this for IT placements?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  Yes! Thousands of students from ECE, Electrical, and Mechanical branches transition into software roles every year. Our builder lets you showcase your programming skills (Python, Java, DSA) and software projects right alongside your core engineering degree.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Is downloading the PDF really free with no watermarks?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  Yes, 100% free. We know students don&apos;t want to pay $24 or get hit by hidden subscriptions when applying for their first job. You can build and download as many vector PDFs as you need completely free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Get Placed Faster with a <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Recruiter-Grade Resume.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Join engineering graduates from IITs, NITs, and top universities who cracked placements at leading tech firms.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Create B.Tech Resume Free</span>
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
