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
  title: 'Curriculum Vitae Maker: Academic, Medical & Research CV Builder | ResumeBuilder',
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
    url: 'https://resumebuilder.app/curriculum-vitae-maker',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/curriculum-vitae-maker',
  },
};

export default function CurriculumVitaeMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Curriculum Vitae Academic & Medical Maker',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Specialized Curriculum Vitae software for professors, post-docs, physicians, researchers, and PhD candidates with multi-page publication layouts.',
  };

  const academicTemplates = TEMPLATES.filter(
    (t) => t.id === 'traditional' || t.id === 'vienna' || t.id === 'ats' || t.id === 'stockholm'
  );

  return (
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-6">
              <Microscope className="w-4 h-4 text-indigo-600" />
              <span>Academic, Medical &amp; Scientific Standards</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Curriculum Vitae{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Maker &amp; Formatter
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Designed for professors, PhD researchers, physicians, and scientific fellows. Showcase peer-reviewed papers, lab appointments, research grants, and teaching awards in immaculate multi-page A4 PDF.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-base hover:bg-emerald-800 transition shadow-xl shadow-blue-600/20"
              >
                <span>Format Curriculum Vitae Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/cv-maker"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-base hover:bg-slate-200 transition border border-slate-200"
              >
                <span>View Global CV Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Academic Structure Overview */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Standard Academic &amp; Clinical CV Architecture
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Unlike 1-page corporate resumes, a Curriculum Vitae must provide exhaustive chronological documentation of your scholarship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Education &amp; Post-Doc Training</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear hierarchy for PhD dissertation title, doctoral advisors, committee members, fellowships, and post-doctoral appointments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Peer-Reviewed Publications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                APA / MLA / Chicago-compliant bibliographies, journal impact factors, co-authorship markings, and direct DOI hyperlinks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Grants &amp; Institutional Funding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Document grant numbers, funding agencies (NIH, NSF, ERC, DST), total awarded capital, and your role (Principal Investigator vs Co-PI).
              </p>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Academic &amp; Research Templates
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Curriculum Vitae Formats
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Single-column academic structures that conform to committee review protocols and institutional guidelines.
                </p>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                <span>Browse all templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {academicTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-base font-bold text-slate-900 block mb-1">{tpl.name}</span>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-3">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-700 text-white font-bold text-xs text-center hover:bg-emerald-800 transition shadow-sm"
                  >
                    Select Format
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Format Your Academic Curriculum Vitae with Precision
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              No hidden fees, no subscription gates. Export publication-grade vector PDFs instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-500 transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Launch Curriculum Vitae Maker</span>
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
