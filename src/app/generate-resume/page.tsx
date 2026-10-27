import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Download,
  FileText,
  Layers,
  ChevronRight,
  Clock,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Generate Resume: Free Online Resume Generator',
  description:
    'Generate resume free online in 3 minutes. Free online resume generator with 30+ ATS templates, pre-written bullet suggestions, and instant vector PDF export.',
  keywords: [
    'generate resume',
    'resume generator free',
    'online resume generator',
    'generate resume online',
    'free resume generator',
    'free resume generator online',
    'online resume maker free pdf',
    'instant resume generator',
    'fast resume maker free',
    'resume creator free',
    'build your resume free'
  ],
  openGraph: {
    title: 'Generate Resume: Free Online Resume Generator | ResumeBabu',
    description:
      'Generate a professional, ATS-ready resume with pre-written industry bullet points and instant vector PDF export.',
    type: 'website',
    url: 'https://resumebabu.com/generate-resume',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Generate Resume Online in 3 Minutes - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generate Resume: Free Online Resume Generator | ResumeBabu',
    description:
      'Generate a professional, ATS-ready resume with pre-written industry bullet points and instant vector PDF export.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/generate-resume',
  },
};

export default function GenerateResumePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBabu Instant Resume Generator',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1460',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Fast automated resume generator that creates recruiter-ready resumes in under 5 minutes with free vector PDF export.',
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
        name: 'Generate Resume',
        item: 'https://resumebabu.com/generate-resume',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I generate a resume online for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply select any of our 30+ ATS-compliant templates, enter your job title to receive pre-written bullet point suggestions, customize your details, and click download. You will get a high-resolution vector PDF in under 3 minutes with zero payment required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this free online resume generator really free with zero watermarks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike sites that hit you with a $24.95 credit card paywall at the download step, ResumeBabu offers 100% free resume generation and vector PDF downloads with no watermarks, no trials, and no hidden fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does this instant resume generator ensure ATS compliance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every template is engineered with standard semantic HTML heading hierarchies, sequential column ordering, and embedded typography that parse cleanly across Workday, Taleo, Greenhouse, and Lever with a 98%+ pass rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why choose ResumeBabu over Kickresume, Novorésumé, or Resume.io?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While Kickresume, Novorésumé, and Resume.io charge $19.99 to $24.95/month and lock multi-page exports or high-res PDFs behind paywalls, ResumeBabu gives you unlimited free vector PDF downloads, live A4 pagination, and real-time job description matching completely free.',
        },
      },
      {
        '@type': 'Question',
        name: 'What format does the generated resume download in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Resumes are exported as crisp, publication-grade vector A4 PDF files with selectable text layers, ensuring your layout appears identical across desktop monitors, mobile phones, and recruiter printouts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I customize sections after generating my resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can reorder sections, add custom sections (Projects, Certifications, Awards), adjust font pairings, line heights, and margins in real time using our visual interactive editor.',
        },
      },
    ],
  };

  const topTemplates = TEMPLATES.slice(0, 4);

  return (
    <div className="min-w-[320px] bg-background text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Fast 3-Minute Online Resume Generator</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Generate Resume Free:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Online Resume Generator
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Skip hours of formatting frustration. Use our free online resume generator to pick an ATS-approved layout, auto-generate recruiter-approved bullet points, and export your free vector PDF with zero hidden fees or credit cards.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Generate Your Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Browse Formats</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Instant Generator */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Fastest Way to Build Your Next Resume<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed mt-3">
              Three streamlined steps from start to download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Choose Proven Template</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select from 12 recruiter-approved templates calibrated for Fortune 500 ATS screening algorithms.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Auto-Generate Bullets</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your job title and let our intelligent engine provide pre-written, quantifiable accomplishment statements.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Instant PDF Download</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download your high-resolution vector PDF immediately with zero watermarks and no hidden paywalls.
              </p>
            </div>
          </div>

          {/* Comparison Matrix: ResumeBabu vs Kickresume vs Novorésumé vs Resume.io */}
          <div className="mt-16 bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Market Comparison
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ResumeBabu vs. Paid Online Resume Generators
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Compare our free online resume generator with other popular commercial makers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-border text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4 font-mono font-medium">Feature</th>
                    <th className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBabu</th>
                    <th className="py-3 px-4 font-mono font-medium">Kickresume</th>
                    <th className="py-3 px-4 font-mono font-medium">Novorésumé</th>
                    <th className="py-3 px-4 font-mono font-medium">Resume.io</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Vector PDF Export Paywalls</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">100% Free Forever</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Watermark or $19/mo</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$19.99/mo Paywall</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$24.95/mo Paywall</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Instant Online Generation Speed</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">&lt; 3 Minutes (No Signup)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Multi-Step Sign-up</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Account Required</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Long Wizard</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">ATS Pass Rate Certification</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">98%+ on Workday &amp; Taleo</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic ATS</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">90%+ Pass Rate</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic ATS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Pre-Written Bullet Generator</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">Included Free (Google XYZ)</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Limited AI Credits</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Bullet Library</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Pre-written Phrases</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Multi-Page A4 Precision</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">GhostDOM Live Previews</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Flowing Content</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paywalled 2nd Page</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Split</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                  Instant Starters
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Ready-to-Generate Templates<span className="text-emerald-700 dark:text-emerald-400">.</span>
                </h2>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
              >
                <span>View all templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 hover:border-emerald-500/40 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-white block mb-2">{tpl.name}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Generate With This
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-border bg-emerald-500/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-serif font-bold text-base text-slate-900 dark:text-white block">
                  Need a specialized document format?
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                  Applying for research, medical, or tenure positions? Use our dedicated <Link href="/curriculum-vitae-maker" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">Curriculum Vitae Maker</Link>. Or customize section-by-section with our <Link href="/free-resume-builder" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">Free Resume Builder</Link> and <Link href="/ats-resume-builder" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">ATS Resume Builder</Link>.
                </p>
              </div>
              <Link
                href="/curriculum-vitae-maker"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-card border border-border text-xs font-bold text-slate-900 dark:text-white hover:border-emerald-500/40 transition shrink-0 shadow-xs"
              >
                <span>Academic CV Maker</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Questions About Resume Generation<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Everything you need to know about generating your resume online for free.
              </p>
            </div>

            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-border bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                    {faq.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Stop Staring at a Blank Screen. <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Generate Your Resume Now.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Free, fast, and recruiter-approved. Join over 120,000 active job seekers today.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Start Free Resume Generator</span>
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
