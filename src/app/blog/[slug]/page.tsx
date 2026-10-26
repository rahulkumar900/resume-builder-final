import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-data';
import { BlogPostClient } from '@/components/blog/BlogPostClient';
import { BlogBackButton } from '@/components/blog/BlogBackButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

const BLOG_SEO_TITLES: Record<string, string> = {
  'how-to-beat-applicant-tracking-systems-2026': 'How to Beat ATS Systems in 2026',
  'how-to-write-resume-with-no-experience': 'How to Write a Resume With No Experience',
  '120-high-impact-resume-action-verbs': '120+ Resume Action Verbs Recruiters Love',
  'top-10-resume-mistakes-costing-interviews': 'Top 10 Resume Mistakes to Avoid',
  'how-to-tailor-resume-to-job-description': 'How to Tailor Your Resume to a Job Post',
  'resume-vs-cv-complete-guide': 'Resume vs CV: Differences & Format Guide',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const seoTitle = BLOG_SEO_TITLES[slug] || post.title.slice(0, 42);

  return {
    title: seoTitle,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${seoTitle} | ResumeBabu`,
      description: post.excerpt,
      type: 'article',
      url: `https://resumebabu.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: 'https://resumebabu.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${seoTitle} - ResumeBabu`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seoTitle} | ResumeBabu`,
      description: post.excerpt,
      images: ['https://resumebabu.com/twitter-image'],
    },
    alternates: {
      canonical: `https://resumebabu.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.relatedSlugs);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: 'https://resumebabu.com/opengraph-image',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `https://resumebabu.com/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeBabu',
      url: 'https://resumebabu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resumebabu.com/logo.png',
      },
    },
    keywords: post.keywords.join(', '),
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
        name: 'Blog',
        item: 'https://resumebabu.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://resumebabu.com/blog/${post.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-w-[320px] bg-background min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300 selection:bg-emerald-100 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Navbar />

      <main className="flex-1">
        {/* Article Header */}
        <header className="bg-white dark:bg-[#161614] border-b border-border pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Back & Breadcrumbs Bar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <BlogBackButton />
              <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <Link href="/blog" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Blog
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs">
                  {post.title}
                </span>
              </nav>
            </div>

            {/* Category & Metadata badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                {post.category}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Updated {post.updatedAt}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {post.subtitle}
            </p>

            {/* Author Profile */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section & Sticky Sidebar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content (8 cols) */}
            <article className="lg:col-span-8 space-y-6 text-slate-700 dark:text-slate-300">
              {post.contentHtml.map((block, idx) => {
                if (block.type === 'heading2') {
                  return (
                    <h2
                      key={idx}
                      id={block.id}
                      className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-6 pb-2 scroll-mt-24 border-b border-border"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === 'heading3') {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-bold text-slate-900 dark:text-white tracking-tight pt-4 pb-1"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === 'paragraph') {
                  return (
                    <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'bulletList' && block.items) {
                  return (
                    <ul key={idx} className="space-y-2.5 my-4">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === 'codeFormula') {
                  return (
                    <div
                      key={idx}
                      className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 my-6 font-mono text-sm sm:text-base border border-slate-800 shadow-sm flex items-center justify-between"
                    >
                      <span className="text-emerald-400 font-semibold">{block.text}</span>
                    </div>
                  );
                }

                if (block.type === 'callout') {
                  const isTip = block.calloutType === 'tip';
                  const isWarning = block.calloutType === 'warning';
                  const bgClass = isTip
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
                    : isWarning
                    ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-950 dark:text-rose-200'
                    : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200';

                  const IconComp = isTip ? Sparkles : isWarning ? AlertTriangle : Info;
                  const iconColor = isTip ? 'text-emerald-600 dark:text-emerald-400' : isWarning ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400';

                  return (
                    <div
                      key={idx}
                      className={`p-5 sm:p-6 rounded-2xl border ${bgClass} my-6 space-y-2`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <IconComp className={`w-4 h-4 ${iconColor}`} />
                        <span>{block.calloutTitle || 'Note'}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                        {block.text}
                      </p>
                    </div>
                  );
                }

                if (block.type === 'comparisonTable' && block.tableHeaders && block.tableRows) {
                  return (
                    <div key={idx} className="overflow-x-auto my-6 rounded-2xl border border-border shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-[#1a1916] border-b border-border text-slate-800 dark:text-slate-200">
                            {block.tableHeaders.map((header, hIdx) => (
                              <th key={hIdx} className="p-3.5 font-bold">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] bg-white dark:bg-[#161614]">
                          {block.tableRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3.5 ${
                                    cIdx === 0
                                      ? 'font-bold text-slate-900 dark:text-white'
                                      : cIdx === 1
                                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                                      : 'text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              })}

              {/* In-Article Resume Tool Card */}
              <div className="mt-12 bg-white dark:bg-[#161614] rounded-3xl border border-border p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Interactive Resume Audit</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Does Your Resume Pass These ATS Rules?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Upload your existing resume or create one in our visual editor. Our automated 6-pillar ATS audit checks page budget, metric strength, keyword density, and formatting reliability instantly.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/create"
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition shadow-sm inline-flex items-center gap-2"
                  >
                    <span>Build &amp; Score Resume Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/templates"
                    className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm border border-border transition"
                  >
                    Browse ATS Templates
                  </Link>
                </div>
              </div>

              {/* FAQs Section */}
              {post.faqs.length > 0 && (
                <div className="pt-10 border-t border-border space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-3">
                    {post.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-5 rounded-2xl bg-white dark:bg-[#161614] border border-border shadow-2xs space-y-1.5"
                      >
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <BlogPostClient post={post} />
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="bg-white dark:bg-[#161614] border-t border-border py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
                Recommended Related Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.slug}
                    className="bg-background rounded-2xl border border-border p-5 hover:border-emerald-500 dark:hover:border-emerald-500/80 hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#161614] border border-border text-slate-700 dark:text-slate-300">
                        {rel.category}
                      </span>
                      <Link href={`/blog/${rel.slug}`} className="block">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <span>Read Guide</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
