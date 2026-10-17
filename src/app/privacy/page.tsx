import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Eye, Server, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security | ResumeBuilder',
  description:
    'Learn how ResumeBuilder protects your resume data and privacy. We do not sell your personal information or train public AI models on your private resumes.',
  alternates: {
    canonical: 'https://resumebuilder.app/privacy',
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'October 1, 2026';

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pt-16 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Our commitment to your{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">privacy</span>.
            </h1>
            <p className="mt-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
              Last updated: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span> &bull; Compliant with global privacy standards &amp; Indian DPDP Act.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-card/90 border border-emerald-500/30 dark:border-emerald-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium shadow-xs text-left">
              <strong className="text-slate-900 dark:text-white">Core Privacy Commitment:</strong> We never sell your personal data or resume history. Your resume content is strictly confidential and is <u>never used to train public generative AI foundation models</u> without explicit consent.
            </div>
          </div>
        </section>

        {/* Privacy Document */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-8 sm:p-12 shadow-xs space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">1.</span> Information We Collect
              </h2>
              <p>
                We collect only the minimum necessary information required to generate, format, and audit your resume:
              </p>
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 pl-1">
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">A. Account Credentials:</strong>
                  When you sign up or log in, we collect your email address and optional profile name via our secure authentication provider.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">B. Resume Content:</strong>
                  Personal contact information (phone, email, links), employment history, education milestones, skills, project summaries, and certifications you explicitly type or import.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">C. Target Job Descriptions:</strong>
                  Job text you paste into our Job Tailor or ATS Matcher to calculate skill gap scores.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">D. Anonymous Telemetry:</strong>
                  Standard technical logs (browser type, device screen dimensions, error crash logs) to optimize page rendering and performance.
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">2.</span> How We Use Your Information
              </h2>
              <p>Your information is used strictly to power the core services you request:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>Generating and rendering pixel-perfect vector A4 PDFs.</li>
                <li>Executing real-time ATS keyword matching and parsing diagnostic tests.</li>
                <li>Delivering section-specific AI rewriters and bullet point optimizations.</li>
                <li>Saving your resume drafts locally in your browser and syncing across devices when logged in.</li>
                <li>Responding to your customer support requests and bug reports.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">3.</span> AI Privacy &amp; Data Safeguards
              </h2>
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200 text-xs sm:text-sm space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
                  <Lock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  Enterprise AI Boundary Guarantee
                </div>
                <p>
                  When you use our AI features (such as STAR bullet optimization or JD tailoring), the content snippet is transmitted over TLS 1.3 encrypted connections directly to enterprise API endpoints.
                </p>
                <p>
                  <strong>No Model Training:</strong> Under our enterprise agreements, your personal career history, contact details, and custom bullet points are <u>zero-retention</u> and are not used by AI providers to train public models.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">4.</span> Data Storage &amp; Security
              </h2>
              <p>
                We employ industry-standard administrative, technical, and physical safeguards:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Browser-First Architecture:</strong> Your draft edits are saved locally in your browser storage (IndexedDB/LocalStorage) so you never lose work during network disconnects.</li>
                <li><strong>Encryption in Transit:</strong> All web communication uses HTTPS with strict transport security (HSTS) and modern TLS protocols.</li>
                <li><strong>Cloud Security:</strong> Database records are encrypted at rest using AES-256 standards with strict row-level access controls.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">5.</span> Your Rights &amp; 1-Click Data Erasure
              </h2>
              <p>You have full ownership and control over your personal data at all times:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Access &amp; Export:</strong> You can download and export all your resumes in vector PDF format or JSON format anytime.</li>
                <li><strong>Modification:</strong> You can update or alter any piece of information directly within the builder interface.</li>
                <li><strong>Right to Be Forgotten:</strong> You can permanently delete any individual resume or request total deletion of your user account. Once initiated, all associated resume drafts are scrubbed from our systems.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">6.</span> Third-Party Service Providers
              </h2>
              <p>
                We do not sell, rent, or trade your personal information. We work only with vetted infrastructure partners who adhere to rigorous security standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white">Authentication:</strong> Firebase / Supabase Auth
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white">Hosting &amp; Edge:</strong> Vercel Global Edge Network
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white">AI APIs:</strong> OpenAI &amp; Google Gemini Enterprise
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                  <strong className="text-slate-900 dark:text-white">PDF Generation:</strong> Internal Sandboxed Puppeteer Engine
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-emerald-700 dark:text-emerald-400">7.</span> Privacy Inquiries &amp; Contact
              </h2>
              <p>
                For privacy requests, data export assistance, or questions regarding our security protocols, contact our Data Protection team:
              </p>
              <div className="p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border text-xs font-mono space-y-1">
                <div><strong className="text-slate-900 dark:text-white">Email:</strong> privacy@resumebuilder.app</div>
                <div><strong className="text-slate-900 dark:text-white">Support:</strong> support@resumebuilder.app</div>
                <div><strong className="text-slate-900 dark:text-white">Response Time:</strong> Typically within 24–48 business hours</div>
              </div>
            </section>
          </div>

          {/* Quick Action Card */}
          <div className="mt-16 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Build with confidence and complete privacy<span className="text-emerald-700 dark:text-emerald-400">.</span></h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Your career documents remain your private property. Free exports with zero watermarks.
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
