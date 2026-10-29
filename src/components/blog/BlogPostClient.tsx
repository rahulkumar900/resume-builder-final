'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Check,
  Link2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Award,
  Sparkles
} from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/common/BrandIcons';
import { BlogPost } from '@/lib/blog-data';

interface BlogPostClientProps {
  post: BlogPost;
}

export const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Read "${post.title}" on ResumeBabu:`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Table of Contents Box */}
      <div className="bg-white dark:bg-[#161614] rounded-2xl border border-border p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 pb-2 border-b border-border">
          <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>In This Guide</span>
        </div>
        <nav className="space-y-1.5 text-xs">
          {post.tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block py-1 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:translate-x-0.5 transition-all line-clamp-1"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Share / Social Buttons */}
      <div className="bg-white dark:bg-[#161614] rounded-2xl border border-border p-5 shadow-xs space-y-3">
        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Share This Guide</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 dark:bg-[#1f1e1a] hover:bg-slate-100 dark:hover:bg-[#282723] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-border transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <button
            onClick={shareOnLinkedIn}
            aria-label="Share on LinkedIn"
            className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800/40 transition cursor-pointer"
          >
            <LinkedinIcon className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnTwitter}
            aria-label="Share on X (Twitter)"
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.14] border border-border transition cursor-pointer"
          >
            <TwitterIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Harvard FAS Career Standards Card */}
      <div className="bg-slate-900 dark:bg-[#141412] rounded-2xl p-5 text-white shadow-md border border-slate-800 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ivy League Standards</span>
        </div>
        <h4 className="text-sm font-bold text-slate-100">
          Harvard FAS Resume Rules
        </h4>
        <ul className="text-xs text-slate-300 space-y-2.5">
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Express, Don&apos;t Impress:</strong> Clear, factual phrasing over jargon.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Active Verbs First:</strong> Never start lines with dates or duties.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>No First Person:</strong> 0 pronouns (&quot;I&quot;, &quot;we&quot;, &quot;my&quot;) allowed.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Page Budget:</strong> 1 page standard; 2 pages only with 5+ yrs experience.</span>
          </li>
        </ul>
      </div>

      {/* Harvard FAS Template Quick Launcher */}
      <div className="bg-white dark:bg-[#141412] rounded-2xl p-5 border border-border shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Recommended Template
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            100% ATS
          </span>
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Harvard Ivy Classic
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The single-column layout approved by the Harvard Mignone Center for Career Success. Zero parsing traps, Garamond typography.
        </p>
        <Link
          href="/create?template=harvard"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold rounded-xl transition shadow-xs"
        >
          <span>Use Harvard Template</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <div className="text-center">
          <Link
            href="/templates"
            className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
          >
            Explore all 30+ ATS templates →
          </Link>
        </div>
      </div>

      {/* Sidebar Tooling CTA */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-md space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
          <span>Free Resume Tool</span>
        </div>
        <h4 className="text-base font-black leading-snug">
          Build Your ATS-Ready Resume Today
        </h4>
        <p className="text-xs text-emerald-100 leading-relaxed">
          Zero paywalls, instant vector PDF export, and built-in Harvard FAS action verb suggestions.
        </p>
        <Link
          href="/create"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold rounded-xl transition shadow-xs"
        >
          <span>Create My Resume Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
