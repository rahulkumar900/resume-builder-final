import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  FileCheck,
  Building,
  Microscope
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Curriculum Vitae Maker - Academic, Medical & Research CVs',
  description:
    'Build a comprehensive, academic-standard Curriculum Vitae. Dedicated sections for peer-reviewed publications, teaching experience, research grants, patents, and medical residencies. 100% free vector PDF export.',
  keywords: [
    'curriculum vitae maker',
    'academic cv maker',
    'medical cv builder',
    'research cv maker',
    'curriculum vitae format',
    'phd cv builder',
    'fellowship cv format',
    'curriculum vitae online free'
  ],
  openGraph: {
    title: 'Curriculum Vitae Maker | Academic, Medical & Research CVs',
    description:
      'Format comprehensive multi-page CVs with peer-reviewed publications, research grants, and teaching appointments. Free vector PDF export.',
    type: 'website',
    url: 'https://resumebabu.com/curriculum-vitae-maker',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Curriculum Vitae Maker - ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curriculum Vitae Maker | Academic, Medical & Research CVs',
    description:
      'Format comprehensive multi-page CVs with peer-reviewed publications, research grants, and teaching appointments. Free vector PDF export.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/curriculum-vitae-maker',
  },
};

export default function CurriculumVitaeMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Curriculum Vitae Academic & Medical Maker',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1180',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    description:
      'Specialized Curriculum Vitae software for professors, post-docs, physicians, researchers, and PhD candidates with multi-page publication layouts.',
  };

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
        name: 'Curriculum Vitae Maker',
        item: 'https://resumebabu.com/curriculum-vitae-maker',
      },
    ],
  };

  const academicTemplates = TEMPLATES.filter(
    (t) => t.id === 'traditional' || t.id === 'vienna' || t.id === 'ats' || t.id === 'stockholm'
  );

  return (
    <div className="min-w-[320px] bg-background text-foreground min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32 border-b border-border">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Microscope className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Academic, Medical &amp; Scientific Standards</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Curriculum Vitae <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Maker &amp; Formatter</span> for scholars.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Designed for professors, PhD researchers, physicians, and scientific fellows. Showcase peer-reviewed papers, lab appointments, research grants, and teaching awards in immaculate multi-page A4 PDF.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Format Curriculum Vitae Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cv-maker"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>View Global CV Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Academic Structure Overview */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
              SCHOLARSHIP HIERARCHY
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Standard Academic &amp; Clinical CV Architecture<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike 1-page corporate resumes, a Curriculum Vitae must provide exhaustive chronological documentation of your scholarship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Education &amp; Post-Doc Training</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Clear hierarchy for PhD dissertation title, doctoral advisors, committee members, fellowships, and post-doctoral appointments.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Peer-Reviewed Publications</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                APA / MLA / Chicago-compliant bibliographies, journal impact factors, co-authorship markings, and direct DOI hyperlinks.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Grants &amp; Institutional Funding</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Document grant numbers, funding agencies (NIH, NSF, ERC, DST), total awarded capital, and your role (Principal Investigator vs Co-PI).
              </p>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
                ACADEMIC &amp; RESEARCH TEMPLATES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Curriculum Vitae Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Single-column academic structures that conform to committee review protocols and institutional guidelines.
              </p>
            </div>
            <Link
              href="/templates"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
            >
              <span>Browse all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-lg font-bold text-slate-900 dark:text-white block mb-1">{tpl.name}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <Link
                  href={`/create?template=${tpl.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm cursor-pointer"
                >
                  Select Format
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 text-center border-t border-border max-w-5xl mx-auto space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
            ACADEMIC EXCELLENCE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Present Your Research with Authority<span className="text-emerald-700 dark:text-emerald-400">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Format your tenure-track, residency, or post-doctoral Curriculum Vitae with verified multi-page vector PDF precision.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <span>Build My Academic CV Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1] rounded-xl"
            >
              <span>Browse Academic Formats</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
