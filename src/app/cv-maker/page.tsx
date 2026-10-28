import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
  Globe,
  Award,
  FileText,
  Layers,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free CV Maker Online: Curriculum Vitae PDF',
  description:
    'Free CV maker online. Create professional curriculum vitae with 30+ ATS friendly CV templates, multi-page A4 support, and free vector PDF downloads.',
  keywords: [
    'cv maker',
    'curriculum vitae maker',
    'cv maker free',
    'create cv online free',
    'cv builder free',
    'ats friendly cv template',
    'free curriculum vitae maker',
    'curriculum vitae generator',
    'online cv maker',
    'cv creator free',
    'build cv online free'
  ],
  openGraph: {
    title: 'Free CV Maker Online: Curriculum Vitae PDF | ResumeBabu',
    description:
      'Format professional CVs for UK, Europe, academic, and international applications. Zero paywalls, free vector PDF download.',
    type: 'website',
    url: 'https://resumebabu.com/cv-maker',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free CV Maker Online - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CV Maker Online: Curriculum Vitae PDF | ResumeBabu',
    description:
      'Format professional CVs for UK, Europe, academic, and international applications. Zero paywalls, free vector PDF download.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/cv-maker',
  },
};

export default function CvMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBabu CV Maker & Curriculum Vitae Creator',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1420',
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
      'Comprehensive Curriculum Vitae builder for international, executive, and academic professionals with multi-page A4 formatting and ATS optimization.',
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
        name: 'CV Maker',
        item: 'https://resumebabu.com/cv-maker',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I create CV online free with instant PDF export?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose an ATS friendly CV template on ResumeBabu, input your career, education, and research accomplishments, and export a publication-ready vector PDF in under 3 minutes with our CV builder free platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this CV maker free for multi-page academic and international formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! While competitors lock page 2 behind a subscription, our CV maker free tier offers unlimited pages, dynamic A4 page boundary fitting, and zero credit card requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an ATS friendly CV template?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An ATS friendly CV template uses machine-readable section tags, standard system typography, linear single or dual column DOM partitions, and clean text layers rather than flattened images, ensuring 98%+ pass rates across corporate and university applicant tracking systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a CV and a Resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the US and Canada, a resume is typically a concise 1-page summary of work history, while a CV (Curriculum Vitae) is a multi-page comprehensive record of academic credentials, research, publications, and teaching. In the UK, Europe, Australia, and India, "CV" is the standard term used for all corporate job applications regardless of length.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I build a multi-page curriculum vitae with this tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our platform supports both single-page corporate CVs and multi-page academic CVs. The real-time A4 GhostDOM engine automatically manages page breaks cleanly without splitting sentences or tables across pages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why choose ResumeBabu over Novorésumé or Resume.io for CVs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While Novorésumé and Resume.io paywall 2nd and 3rd pages and charge $19.99 to $24.95/month for PDF downloads, ResumeBabu offers 100% free unlimited multi-page CV exports, live A4 formatting, and academic section support with zero paywalls.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the CV maker completely free to use and download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can draft, edit, format, and download your complete Curriculum Vitae in high-resolution vector PDF format without paying any fees or submitting a credit card.',
        },
      },
    ],
  };

  const cvTemplates = TEMPLATES.filter(
    (t) => t.id === 'traditional' || t.id === 'vienna' || t.id === 'ats' || t.id === 'stockholm' || t.id === 'amelia'
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32 border-b border-border">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>International &amp; Academic Curriculum Vitae Standards</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-foreground leading-[1.08] max-w-4xl mx-auto">
              Free <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">CV Maker Online</span>: Curriculum Vitae Builder.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
              The premier CV maker free for job seekers. Create CV online free with our intuitive CV builder free, choose from 30+ ATS friendly CV templates, format multi-page A4 layouts, and download vector PDFs with zero paywalls.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Create Your Free CV</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-sm hover:opacity-80 transition border border-border"
              >
                <span>View CV Formats</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CV Sections Support */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
              ACADEMIC &amp; CAREER SECTIONS
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Specialized Sections for Every Milestone<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              From academic grants to global enterprise leadership, our CV builder supports comprehensive multi-disciplinary sections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Publications &amp; Research</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Dedicated fields for journal articles, conference papers, citations, and DOI links formatted for peer review boards. Need a specialized academic dossier? Try our dedicated{' '}
                <Link href="/curriculum-vitae-maker" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:opacity-80">
                  Curriculum Vitae Maker
                </Link>
                .
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Grants, Honors &amp; Awards</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Highlight fellowships, scholarships, monetary grants, and corporate industry awards with proper dates and awarding bodies.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">International Compliance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Compliant with UK, European (Europass-compatible fields), Middle Eastern, and Asian hiring customs and terminology.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Enterprise ATS Parsing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Verified against global Applicant Tracking Systems including Workday Global, Taleo International, and SAP SuccessFactors.
              </p>
            </div>
          </div>

          {/* Comparison Matrix: ResumeBabu vs Novorésumé vs Resume.io vs Kickresume */}
          <div className="mt-16 bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Curriculum Vitae Comparison
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ResumeBabu vs. Paid Online CV Makers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Compare multi-page formatting and vector PDF export features before you start.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-border text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4 font-mono font-medium">Feature</th>
                    <th className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBabu</th>
                    <th className="py-3 px-4 font-mono font-medium">Novorésumé</th>
                    <th className="py-3 px-4 font-mono font-medium">Resume.io</th>
                    <th className="py-3 px-4 font-mono font-medium">Kickresume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Multi-Page A4 CV Exports</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">Unlimited Free Pages</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paywalled 2nd Page</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Flow (Paywalled)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$19/mo Sub Needed</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">PDF Download Paywall</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">100% Free Forever</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$19.99/mo Paywall</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$24.95/mo Paywall</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Watermarked / $19/mo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Academic &amp; Research Sections</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">Dedicated Publications/Grants</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Generic Text Blocks</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Custom Sections</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Standard Text</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">ATS Pass Rate Certification</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">98%+ on Workday &amp; Taleo</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">90%+ Pass Rate</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic ATS</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Standard ATS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Page Overflow Engine</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">GhostDOM A4 Pagination</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Manual Canvas Align</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Split</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Flowing Content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CV Templates Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
                GLOBAL STANDARDS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Top Curriculum Vitae (CV) Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Elegant layouts suitable for academia, medical fellowships, research institutions, and international management.
              </p>
            </div>
            <Link
              href="/templates"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
            >
              <span>View all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                      CV Compatible
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <Link
                  href={`/create?template=${tpl.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm cursor-pointer"
                >
                  Use This CV Format Free
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
              COMMON QUESTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Everything you need to know about formatting and submitting your Curriculum Vitae.
            </p>
          </div>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card/90 shadow-xs space-y-2"
              >
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">Q:</span>
                  {faq.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-border bg-emerald-500/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif font-bold text-sm text-slate-900 dark:text-white block">
                Looking for alternative formats?
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Explore our specialized <Link href="/curriculum-vitae-maker" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">Curriculum Vitae Maker</Link> for academic and medical positions, or use our <Link href="/generate-resume" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">Instant Resume Generator</Link> for fast corporate roles.
              </p>
            </div>
            <Link
              href="/curriculum-vitae-maker"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-border text-xs font-bold text-slate-900 dark:text-white hover:border-emerald-500/40 transition shrink-0"
            >
              <span>Academic CV Maker</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 text-center border-t border-border max-w-5xl mx-auto space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
            READY TO START
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Your Professional CV in Minutes<span className="text-emerald-700 dark:text-emerald-400">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join thousands of researchers, doctors, professors, and international candidates worldwide. Free vector PDF export.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <span>Build Free Curriculum Vitae Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1] rounded-xl"
            >
              <span>Browse CV Templates</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
