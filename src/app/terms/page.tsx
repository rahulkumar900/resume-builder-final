import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { ShieldCheck, FileText, ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | ResumeBuilder',
  description:
    'Read the terms of service and user agreement for ResumeBuilder. Learn about your intellectual property rights, data ownership, acceptable use, and subscription terms.',
  alternates: {
    canonical: 'https://resumebuilder.app/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'October 1, 2026';

  return (
    <div className="min-w-[320px] bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white pt-16">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white dark:bg-[#141310] rounded-3xl border border-slate-200/80 dark:border-white/[0.08] p-8 sm:p-12 shadow-xs space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
              <FileText className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Legal &amp; User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span> &bull; Effective immediately upon account creation or service use.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong>Quick Summary:</strong> You own 100% of your resume content, uploaded materials, and exported PDF documents. We provide an intelligent builder, ATS diagnostics, and AI suggestions. We will never hold your resume hostage behind watermark ransom paywalls.
            </div>
          </div>

          {/* Content Document */}
          <div className="bg-white dark:bg-[#141310] rounded-3xl border border-slate-200/80 dark:border-white/[0.08] p-8 sm:p-12 shadow-xs space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or using the ResumeBuilder platform (&quot;Service&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;) and our Privacy Policy. If you do not agree to these Terms, please do not use our Service.
              </p>
              <p>
                These Terms apply to all visitors, registered users, job seekers, and any other parties who access or use the Service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">2.</span> Service Description
              </h2>
              <p>
                ResumeBuilder provides software tools enabling users to design, format, audit, optimize, and export professional resumes, curriculum vitae (CVs), and job applications. Core features include:
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">3.</span> Intellectual Property &amp; Content Ownership
              </h2>
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs font-medium space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Your Resumes Belong to You
                </div>
                <p>
                  You retain complete, exclusive ownership of all text, work experience, career milestones, personal contact details, images, and documents you input or generate through ResumeBuilder.
                </p>
              </div>
              <p>
                ResumeBuilder claims zero ownership rights over your personal resume data. By using the platform, you grant us only the limited, temporary license necessary to process, format, paginate, and generate your requested PDF files.
              </p>
              <p>
                The platform software, interface design, code, typography configurations, templates, graphics, algorithms, and logos are the proprietary property of ResumeBuilder and protected by intellectual property laws.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">4.</span> Acceptable Use Policy
              </h2>
              <p>
                You agree to use ResumeBuilder solely for lawful personal or professional recruitment purposes. You agree NOT to:
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">6.</span> AI Assistance &amp; Employment Disclaimer
              </h2>
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Important Disclaimer
                </div>
                <p>
                  ResumeBuilder provides automated formatting, keyword detection, and AI recommendations to improve your application quality. However, we do NOT guarantee job interviews, employment offers, or hiring outcomes.
                </p>
              </div>
              <p>
                You are solely responsible for verifying the factual accuracy, truthfulness, and completeness of all information included in your resume before submitting it to employers.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">7.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, ResumeBuilder, its founders, and affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from your use or inability to use the service, including application rejection, lost job opportunities, or system downtime.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">8.</span> Account Termination &amp; Data Deletion
              </h2>
              <p>
                You may discontinue your use of ResumeBuilder at any time. You have the full right to delete your resumes, clear locally cached drafts, or request total account erasure by contacting support or via your user settings.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">9.</span> Contact Information
              </h2>
              <p>
                If you have questions regarding these Terms of Service, please reach out to our legal and support team:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#191815] border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                <div><strong className="text-slate-900 dark:text-white">Email:</strong> legal@resumebuilder.app</div>
                <div><strong className="text-slate-900 dark:text-white">Support:</strong> support@resumebuilder.app</div>
                <div><strong className="text-slate-900 dark:text-white">Address:</strong> ResumeBuilder Technologies, Bengaluru, Karnataka, India</div>
              </div>
            </section>
          </div>

          {/* Quick Action Card */}
          <div className="mt-10 bg-slate-900 dark:bg-[#191815] border border-slate-800 dark:border-white/[0.08] text-white rounded-3xl p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">Ready to build your ATS-friendly resume?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Create and download a recruiter-tested vector PDF in minutes. No credit card required.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Build My Resume — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
