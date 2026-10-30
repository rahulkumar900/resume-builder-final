'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Tag,
  Award
} from 'lucide-react';
import { BlogPost } from '@/data/blog';

interface BlogIndexClientProps {
  posts: BlogPost[];
}

const CATEGORIES = [
  'All',
  'ATS Secrets',
  'Resume Strategy',
  'Fresher Guides',
  'Career & Formats',
  'Job Search & AI',
  'Interview Advice'
] as const;

export const BlogIndexClient: React.FC<BlogIndexClientProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug || selectedCategory !== 'All' || searchQuery !== '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white dark:bg-[#161614] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1e1a] border border-border'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles & keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#161614] border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Featured Post (Only show on 'All' when not searching) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div className="mb-14">
          <div className="bg-white dark:bg-[#161614] rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    Featured Guide
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 text-xs font-semibold">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-xs border border-emerald-200 dark:border-emerald-800">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Stat card on right */}
              <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl space-y-4 border border-white/10 shadow-lg">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Ivy League Standards</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">Harvard FAS Framework</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Grounded in Harvard FAS Mignone Center for Career Success guidelines: &quot;Express, don&apos;t impress&quot;, action verbs first, zero personal pronouns, and calibrated vector ATS formatting.
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="block w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl text-center transition shadow-xs"
                >
                  Read Flagship Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Harvard FAS & ATS Templates Strip */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="mb-14 bg-slate-50 dark:bg-[#141412] rounded-3xl border border-border p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Award className="w-4 h-4" />
                <span>Featured Templates</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                Harvard FAS &amp; ATS-Tested Resume Templates
              </h3>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition shrink-0"
            >
              <span>Explore all 30+ templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Put these career frameworks into immediate action. Every template follows Harvard FAS guidelines with 0.5&quot;–1.0&quot; margins, single-column flow, and zero unparseable graphics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Template Card 1: Harvard College Classic */}
            <div className="bg-white dark:bg-[#1a1916] rounded-2xl border border-border p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/80 hover:shadow-md transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Harvard College Standard
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">100% ATS</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Harvard College Classic
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  EB Garamond serif, Education &amp; coursework first, academic project cards, and campus leadership. Ideal for freshers and undergraduates.
                </p>
              </div>
              <Link
                href="/create?template=harvard"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                <span>Use College Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Template Card 2: Harvard Technical & Systems */}
            <div className="bg-white dark:bg-[#1a1916] rounded-2xl border border-border p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/80 hover:shadow-md transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Harvard Tech Standard
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">100% ATS</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Harvard Technical &amp; Systems
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Technical skills &amp; systems projects at the top with verified GitHub metrics. Built for software engineers, ML engineers, and data scientists.
                </p>
              </div>
              <Link
                href="/create?template=harvard_tech"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold rounded-xl transition shadow-xs"
              >
                <span>Use Tech Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Template Card 3: Harvard Experienced & MBA */}
            <div className="bg-white dark:bg-[#1a1916] rounded-2xl border border-border p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/80 hover:shadow-md transition group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    Harvard MBA Standard
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">100% ATS</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Harvard Experienced &amp; MBA
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Executive summary, dual-tier experience with quantified ROI metrics, and MBA credential hierarchy. Favored by consulting and Wall St.
                </p>
              </div>
              <Link
                href="/create?template=harvard_experienced"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold rounded-xl transition shadow-xs"
              >
                <span>Use MBA Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {selectedCategory === 'All' ? 'Latest Career & Resume Guides' : `${selectedCategory} Articles`}
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-[#161614] rounded-2xl border border-border p-12 text-center max-w-md mx-auto space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-800 dark:text-white">No articles found</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'All' && !searchQuery ? regularPosts : filteredPosts).map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-[#161614] rounded-2xl border border-border p-6 shadow-xs hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[10px]">
                      {post.author.name.charAt(0)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Career Advice Action Banner */}
      <div className="mt-16 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-800/40">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Harvard FAS &amp; ATS-Tested Standards</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Build Your Recruiter-Approved Resume in Minutes
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Apply these exact Harvard FAS guidelines, metric bullet formulas, and keyword optimization strategies using our free resume builder.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition shadow-md"
            >
              Build Free Resume Now
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition"
            >
              Browse 12 Verified Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
