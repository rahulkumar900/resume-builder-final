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
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: <span className="font-semibold text-slate-700">{lastUpdated}</span> &bull; Compliant with global privacy standards &amp; Indian DPDP Act.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-medium">
              <strong>Core Privacy Commitment:</strong> We never sell your personal data or resume history. Your resume content is strictly confidential and is <u>never used to train public generative AI foundation models</u> without explicit consent.
            </div>
          </div>

          {/* Privacy Document */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">1.</span> Information We Collect
              </h2>
              <p>
                We collect only the minimum necessary information required to generate, format, and audit your resume:
              </p>
              <div className="space-y-2.5 text-xs text-slate-600 pl-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-slate-900 block mb-0.5">A. Account Credentials:</strong>
                  When you sign up or log in, we collect your email address and optional profile name via our secure authentication provider.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-slate-900 block mb-0.5">B. Resume Content:</strong>
                  Personal contact information (phone, email, links), employment history, education milestones, skills, project summaries, and certifications you explicitly type or import.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-slate-900 block mb-0.5">C. Target Job Descriptions:</strong>
                  Job text you paste into our Job Tailor or ATS Matcher to calculate skill gap scores.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <strong className="text-slate-900 block mb-0.5">D. Anonymous Telemetry:</strong>
                  Standard technical logs (browser type, device screen dimensions, error crash logs) to optimize page rendering and performance.
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">2.</span> How We Use Your Information
              </h2>
              <p>Your information is used strictly to power the core services you request:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li>Generating and rendering pixel-perfect vector A4 PDFs.</li>
                <li>Executing real-time ATS keyword matching and parsing diagnostic tests.</li>
                <li>Delivering section-specific AI rewriters and bullet point optimizations.</li>
                <li>Saving your resume drafts locally in your browser and syncing across devices when logged in.</li>
                <li>Responding to your customer support requests and bug reports.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">3.</span> AI Privacy &amp; Data Safeguards
              </h2>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-blue-950 text-xs space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <Lock className="w-4 h-4 text-emerald-700" />
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
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">4.</span> Data Storage &amp; Security
              </h2>
              <p>
                We employ industry-standard administrative, technical, and physical safeguards:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Browser-First Architecture:</strong> Your draft edits are saved locally in your browser storage (IndexedDB/LocalStorage) so you never lose work during network disconnects.</li>
                <li><strong>Encryption in Transit:</strong> All web communication uses HTTPS with strict transport security (HSTS) and modern TLS protocols.</li>
                <li><strong>Cloud Security:</strong> Database records are encrypted at rest using AES-256 standards with strict row-level access controls.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">5.</span> Your Rights &amp; 1-Click Data Erasure
              </h2>
              <p>You have full ownership and control over your personal data at all times:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Access &amp; Export:</strong> You can download and export all your resumes in vector PDF format or JSON format anytime.</li>
                <li><strong>Modification:</strong> You can update or alter any piece of information directly within the builder interface.</li>
                <li><strong>Right to Be Forgotten:</strong> You can permanently delete any individual resume or request total deletion of your user account. Once initiated, all associated resume drafts are scrubbed from our systems.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">6.</span> Third-Party Service Providers
              </h2>
              <p>
                We do not sell, rent, or trade your personal information. We work only with vetted infrastructure partners who adhere to rigorous security standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Authentication:</strong> Firebase / Supabase Auth
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Hosting &amp; Edge:</strong> Vercel Global Edge Network
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>AI APIs:</strong> OpenAI &amp; Google Gemini Enterprise
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>PDF Generation:</strong> Internal Sandboxed Puppeteer Engine
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-emerald-700">7.</span> Privacy Inquiries &amp; Contact
              </h2>
              <p>
                For privacy requests, data export assistance, or questions regarding our security protocols, contact our Data Protection team:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div><strong>Email:</strong> privacy@resumebuilder.app</div>
                <div><strong>Support:</strong> support@resumebuilder.app</div>
                <div><strong>Response Time:</strong> Typically within 24–48 business hours</div>
              </div>
            </section>
          </div>

          {/* Quick Action Card */}
          <div className="mt-10 bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">Build with confidence and complete privacy</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your career documents remain your private property. Free exports with zero watermarks.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
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
