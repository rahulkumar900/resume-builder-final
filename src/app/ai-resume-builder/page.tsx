import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { AiResumeBuilderClient } from '@/components/ai-resume-builder/AiResumeBuilderClient';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder: ATS Format (2026)',
  description:
    '100% free AI resume builder to create, rewrite, and tailor your resume in minutes. Use our resume builder AI with Google XYZ metrics & download free PDF/DOCX.',
  keywords: [
    'free ai resume builder',
    'ai resume builder',
    'resume builder ai',
    'resume ai builder',
    'ai resume builder free',
    'free ai resume writer',
    'ai resume generator',
    'ats resume builder ai',
    'best free ai resume builder',
    'ai resume maker 2026',
    'resume format download word',
    'resumebabu',
  ],
  openGraph: {
    title: 'Free AI Resume Builder: ATS Format (2026) | ResumeBabu',
    description:
      '100% free AI resume builder to create, rewrite, and tailor your resume in minutes. Use our resume builder AI with Google XYZ metrics & download free PDF/DOCX.',
    type: 'website',
    url: 'https://resumebabu.com/ai-resume-builder',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free AI Resume Builder - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder: ATS Format (2026) | ResumeBabu',
    description:
      '100% free AI resume builder to create, rewrite, and tailor your resume in minutes. Use our resume builder AI with Google XYZ metrics & download free PDF/DOCX.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/ai-resume-builder',
  },
};

export default function AiResumeBabuPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBabu Free AI Resume Builder',
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
      reviewCount: '2410',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Free AI resume builder & AI resume writer that generates recruiter-grade bullet points with Google XYZ metrics and tailors resumes to job descriptions.',
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
        name: 'Free AI Resume Builder',
        item: 'https://resumebabu.com/ai-resume-builder',
      },
    ],
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Build an ATS Resume with Our Free AI Resume Builder',
    description:
      'Step-by-step guide to generating an ATS-compliant, recruiter-approved resume using ResumeBabu free AI resume builder.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select an ATS Template',
        text: 'Choose from 50+ single-column and dual-column layouts designed to parse cleanly across Workday, Taleo, and Greenhouse.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Input Career Background or Job Description',
        text: 'Paste your raw bullet points or paste your target job description for automated semantic keyword extraction.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Optimize with Resume AI Builder',
        text: 'Transform passive duties into quantified achievements using Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z].',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Download Free PDF & Word DOCX',
        text: 'Export your finalized resume in print-ready vector PDF or editable Microsoft Word (.docx) format with zero paywalls.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes ResumeBabu the best free AI resume builder in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ResumeBabu provides an entirely free AI resume builder with zero paywalls. Unlike competitors that charge monthly fees or watermark your files, you get unlimited AI bullet rewrites using Google’s X-Y-Z formula, real-time job description matching, and instant downloads in both vector PDF and Microsoft Word (.docx) ATS formats calibrated for 2026 hiring standards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this AI resume builder really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, ResumeBabu is 100% free. You can generate unlimited bullet points, tailor your resume against target job descriptions, and download your final vector PDF or Word (.docx) file without paying fees, subscribing to monthly plans, or having watermarks stamped on your resume.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will ATS software reject a resume written with AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Applicant Tracking Systems (ATS) do not scan for "AI authorship"; they scan for matching keywords, readable font hierarchies, clear job dates, and standardized section headers (Experience, Education, Skills). Because ResumeBabu outputs clean vector text and structured layouts, ATS parsers read it cleanly with high match rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the resume builder AI tailor my CV to job descriptions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You paste the target job description into the studio. Our AI model performs semantic natural language processing to extract primary keywords, core technologies, and required competencies. It then scores your resume in real time, highlighting matching terms (✓) and recommending missing keywords to add naturally.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I download my AI resume in PDF or Word (.docx) format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend downloading both. Use the vector PDF for direct company application portals (Greenhouse, Lever, Workday) to guarantee that margins, fonts, and page breaks remain visually perfect. Use the Word (.docx) file when a recruiter or staffing agency specifically requests an editable document to insert internal agency headers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is ResumeBabu different from copying and pasting with ChatGPT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ChatGPT only outputs unformatted raw text that you must manually copy into Word or Google Docs, where margins, alignment, and formatting often break ATS parsers. ResumeBabu is an end-to-end studio that writes, quantifies with Google’s X-Y-Z formula, checks ATS keywords, manages A4 pagination, and exports print-ready vector PDF and Word documents in one place.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can college freshers use this AI resume builder with no experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our fresher models highlight college coursework, capstone projects, hackathon awards, student club leadership, and technical skill matrices, allowing students and career changers without full-time experience to build strong, credible resumes.',
        },
      },
    ],
  };

  return (
    <div className="min-w-[320px] bg-background text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-300">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        <AiResumeBuilderClient />
      </main>

      <Footer />
    </div>
  );
}
