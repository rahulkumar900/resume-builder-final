import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { ShieldCheck, FileText, ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms of service and user agreement for ResumeBabu. Learn about your intellectual property rights, data ownership, and acceptable use terms.',
  openGraph: {
    title: 'Terms of Service | ResumeBabu',
    description:
      'Read the terms of service and user agreement for ResumeBabu.',
    type: 'website',
    url: 'https://resumebabu.com/terms',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeBabu Terms of Service',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ResumeBabu',
    description:
      'Read the terms of service and user agreement for ResumeBabu.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'October 1, 2026';

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
        name: 'Terms of Service',
        item: 'https://resumebabu.com/terms',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pt-16 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <FileText className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Legal &amp; User Agreement</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Our fair &amp; transparent{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">terms of service</span>.
            </h1>
            <p className="mt-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              Last updated: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span> &bull; Effective immediately upon account creation or service use.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-card/90 border border-emerald-500/30 dark:border-emerald-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium shadow-xs text-left">
              <strong className="text-slate-900 dark:text-white">Quick Summary:</strong> You own 100% of your resume content, uploaded materials, and exported PDF documents. We provide an intelligent builder, ATS diagnostics, and AI suggestions. We will never hold your resume hostage behind watermark ransom paywalls.
            </div>
          </div>
        </section>

        {/* Content Document */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-8 sm:p-12 shadow-xs space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using the ResumeBabu platform (&quot;Service&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;) and our Privacy Policy. If you do not agree to these Terms, please do not use our Service.
              </p>
              <p>
                These Terms apply to all visitors, registered users, job seekers, and any other parties who access or use the Service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">2.</span> Service Description
              </h2>
              <p>
                ResumeBabu provides software tools enabling users to design, format, audit, optimize, and export professional resumes, curriculum vitae (CVs), and job applications. Core features include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>Dynamic A4 multi-page pagination engine with vector PDF export.</li>
                <li>Applicant Tracking System (ATS) compatibility analysis and diagnostic scoring.</li>
                <li>Job description keyword extraction and resume-matching suggestions.</li>
                <li>AI-assisted content suggestions, STAR bullet rewriters, and formatting helpers.</li>
                <li>Pre-configured layout templates tailored for tech, executive, academic, and fresher roles.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">3.</span> Intellectual Property &amp; Content Ownership
              </h2>
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs font-medium space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Your Resumes Belong to You
                </div>
                <p>
                  You retain complete, exclusive ownership of all text, work experience, career milestones, personal contact details, images, and documents you input or generate through ResumeBabu.
                </p>
              </div>
              <p>
                ResumeBabu claims zero ownership rights over your personal resume data. By using the platform, you grant us only the limited, temporary license necessary to process, format, paginate, and generate your requested PDF files.
              </p>
              <p>
                The platform software, interface design, code, typography configurations, templates, graphics, algorithms, and logos are the proprietary property of ResumeBabu and protected by intellectual property laws.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">4.</span> Acceptable Use Policy
              </h2>
              <p>
                You agree to use ResumeBabu solely for lawful personal or professional recruitment purposes. You agree NOT to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>Create fraudulent, defamatory, impersonating, or intentionally misleading resumes.</li>
                <li>Reverse-engineer, decompile, crawl, or scrape our platform or template structures.</li>
                <li>Abuse, overload, or disrupt our AI generation APIs or server infrastructure.</li>
                <li>Use our tools to generate spam, automated unsolicited applications, or harmful content.</li>
                <li>Attempt to bypass security features, rate limits, or access controls.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">5.</span> Free Tier &amp; Pro Subscriptions
              </h2>
              <p>
                <strong>Free Forever Features:</strong> The core resume builder, selection of standard templates, real-time A4 pagination, and vector PDF exports are completely free of charge. We do not demand credit card information or add watermarks to your downloads.
              </p>
              <p>
                <strong>Pro Upgrades:</strong> Optional paid plans provide enhanced capabilities such as unlimited AI bullet rewrites, deep multi-page ATS audits, and priority rendering. Paid subscriptions are billed in advance on a recurring monthly or annual basis, and can be cancelled at any time through your dashboard with no cancellation penalties.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">6.</span> AI Assistance &amp; Employment Disclaimer
              </h2>
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Important Disclaimer
                </div>
                <p>
                  ResumeBabu provides automated formatting, keyword detection, and AI recommendations to improve your application quality. However, we do NOT guarantee job interviews, employment offers, or hiring outcomes.
                </p>
              </div>
              <p>
                You are solely responsible for verifying the factual accuracy, truthfulness, and completeness of all information included in your resume before submitting it to employers.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">7.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, ResumeBabu, its founders, and affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from your use or inability to use the service, including application rejection, lost job opportunities, or system downtime.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">8.</span> Account Termination &amp; Data Deletion
              </h2>
              <p>
                You may discontinue your use of ResumeBabu at any time. You have the full right to delete your resumes, clear locally cached drafts, or request total account erasure by contacting support or via your user settings.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">9.</span> Contact Information
              </h2>
              <p>
                If you have questions regarding these Terms of Service, please reach out to our legal and support team:
              </p>
              <div className="p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border text-xs font-mono space-y-1">
                <div><strong className="text-slate-900 dark:text-white">Email:</strong> legal@resumebabu.com</div>
                <div><strong className="text-slate-900 dark:text-white">Support:</strong> support@resumebabu.com</div>
                <div><strong className="text-slate-900 dark:text-white">Address:</strong> ResumeBabu Technologies, Bengaluru, Karnataka, India</div>
              </div>
            </section>
          </div>

          {/* Quick Action Card */}
          <div className="mt-16 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Ready to build your ATS-friendly resume<span className="text-emerald-700 dark:text-emerald-400">?</span></h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Create and download a recruiter-tested vector PDF in minutes. No credit card required.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <span>Build My Resume — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
