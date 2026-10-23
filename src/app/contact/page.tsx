'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import {
  Mail,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Building,
  Clock,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'support',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pt-16 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Mail className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Support &amp; Community</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              We&apos;re here to{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">help you succeed</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Have questions about our ATS algorithms, need help formatting your resume, or want to suggest a new feature? Reach out anytime.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact Channels & Quick FAQ */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Direct Channels<span className="text-emerald-700 dark:text-emerald-400">.</span></h2>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">Customer Support</div>
                      <a href="mailto:support@resumebabu.com" className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono text-xs">
                        support@resumebabu.com
                      </a>
                      <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">For account, download, and template help</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">Privacy &amp; Legal</div>
                      <a href="mailto:privacy@resumebabu.com" className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono text-xs">
                        privacy@resumebabu.com
                      </a>
                      <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">For data export or erasure requests</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F8F7F3] dark:bg-[#161512] border border-border">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">Response Window</div>
                      <div className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Within 24 Hours</div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Monday &ndash; Saturday, 9 AM &ndash; 7 PM IST</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">Helpful Resources:</div>
                  <ul className="text-xs text-emerald-700 dark:text-emerald-400 space-y-1.5 font-medium">
                    <li>
                      <Link href="/blog" className="hover:underline flex items-center gap-1">
                        <span>Career &amp; ATS Resume Blog</span> &rarr;
                      </Link>
                    </li>
                    <li>
                      <Link href="/ats-checker" className="hover:underline flex items-center gap-1">
                        <span>Free Instant ATS Checker Tool</span> &rarr;
                      </Link>
                    </li>
                    <li>
                      <Link href="/templates" className="hover:underline flex items-center gap-1">
                        <span>Explore All 30+ Templates</span> &rarr;
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-10 shadow-xs">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting us, <strong>{formData.name || 'there'}</strong>. We have received your inquiry and our team will get back to you at <strong>{formData.email}</strong> within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', category: 'support', subject: '', message: '' });
                        }}
                        className="px-6 py-2.5 bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer border border-black/[0.08] dark:border-white/[0.1]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Send us a Message<span className="text-emerald-700 dark:text-emerald-400">.</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Fill out the form below and our engineering and recruitment support team will respond promptly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 dark:bg-[#191815] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 dark:bg-[#191815] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Inquiry Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 dark:bg-[#191815] text-slate-900 dark:text-white"
                      >
                        <option value="support" className="dark:bg-[#191815]">General Technical Support</option>
                        <option value="ats" className="dark:bg-[#191815]">ATS Audit / Parser Inquiries</option>
                        <option value="feedback" className="dark:bg-[#191815]">Feature Request &amp; Feedback</option>
                        <option value="bug" className="dark:bg-[#191815]">Report a Bug / Issue</option>
                        <option value="privacy" className="dark:bg-[#191815]">Privacy &amp; Data Rights</option>
                        <option value="partnership" className="dark:bg-[#191815]">College / TPO Cell Collaboration</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we assist you?"
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 dark:bg-[#191815] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Message Details</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your question or issue in detail..."
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/[0.1] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 dark:bg-[#191815] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
