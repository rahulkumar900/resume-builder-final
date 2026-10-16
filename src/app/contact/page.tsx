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
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>Support &amp; Community</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              We&apos;re here to help you succeed.
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have questions about our ATS algorithms, need help formatting your resume, or want to suggest a new feature? Reach out anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Contact Channels & Quick FAQ */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-lg font-bold text-slate-900">Direct Channels</h2>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Customer Support</div>
                      <a href="mailto:support@resumebuilder.app" className="text-emerald-700 hover:underline">
                        support@resumebuilder.app
                      </a>
                      <div className="text-slate-400 text-[10px] mt-0.5">For account, download, and template help</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Privacy &amp; Legal</div>
                      <a href="mailto:privacy@resumebuilder.app" className="text-emerald-700 hover:underline">
                        privacy@resumebuilder.app
                      </a>
                      <div className="text-slate-400 text-[10px] mt-0.5">For data export or erasure requests</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Response Window</div>
                      <div className="text-slate-700">Within 24 Hours</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">Monday &ndash; Saturday, 9 AM &ndash; 7 PM IST</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-900">Helpful Resources:</div>
                  <ul className="text-xs text-emerald-700 space-y-1.5">
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
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting us, <strong>{formData.name || 'there'}</strong>. We have received your inquiry and our team will get back to you at <strong>{formData.email}</strong> within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', category: 'support', subject: '', message: '' });
                        }}
                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <h2 className="text-lg font-bold text-slate-900">Send us a Message</h2>
                    <p className="text-slate-500 text-[11px]">
                      Fill out the form below and our engineering and recruitment support team will respond promptly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Inquiry Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 text-slate-800"
                      >
                        <option value="support">General Technical Support</option>
                        <option value="ats">ATS Audit / Parser Inquiries</option>
                        <option value="feedback">Feature Request &amp; Feedback</option>
                        <option value="bug">Report a Bug / Issue</option>
                        <option value="privacy">Privacy &amp; Data Rights</option>
                        <option value="partnership">College / TPO Cell Collaboration</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we assist you?"
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Message Details</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your question or issue in detail..."
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-slate-50/50 text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
