import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Roboto,
  Source_Sans_3,
  Poppins,
  Montserrat,
  Lato,
  Raleway,
  Rubik,
  Open_Sans,
  EB_Garamond,
  Playfair_Display,
  Merriweather,
  Outfit,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#15803d',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const sourcesans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sourcesans',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

const opensans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-garamond',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://resumebabu.com'),
  title: {
    default: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Checker',
    template: '%s | ResumeBuilder',
  },
  description:
    'Build an ATS-compliant resume tailored to any job description. 100% free resume builder with 30 ATS templates, real-time A4 pagination, and vector PDF export without paywalls.',
  applicationName: 'ResumeBuilder',
  authors: [{ name: 'ResumeBuilder Editorial Team', url: 'https://resumebabu.com/about' }],
  keywords: [
    'resume builder',
    'free resume builder',
    'ats resume builder',
    'cv maker',
    'curriculum vitae maker',
    'ai resume builder',
    'free resume maker',
    'resume builder for freshers',
    'ats friendly resume templates',
    'btech resume builder',
    'resume format download pdf',
  ],
  creator: 'ResumeBuilder',
  publisher: 'ResumeBuilder',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Resume Checker',
    description:
      'Create an ATS-friendly resume tailored to any job description. 30 ATS templates, real-time A4 page-split, vector PDF export without watermark or payment.',
    url: 'https://resumebabu.com',
    siteName: 'ResumeBuilder',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Checker',
        type: 'image/png',
      },
      {
        url: 'https://resumebabu.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ResumeBuilder - Free AI Resume Builder & ATS Checker',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Resume Checker',
    description:
      'Create an ATS-friendly resume tailored to any job description. 100% free forever with real-time vector PDF export.',
    creator: '@resumebuilder',
    images: ['https://resumebabu.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const rootStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://resumebabu.com/#website',
      url: 'https://resumebabu.com',
      name: 'ResumeBuilder',
      description: '100% Free AI Resume Builder, ATS Checker, and Career Platform',
      publisher: {
        '@id': 'https://resumebabu.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://resumebabu.com/examples?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://resumebabu.com/#organization',
      name: 'ResumeBuilder',
      url: 'https://resumebabu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resumebabu.com/favicon.ico',
        width: 64,
        height: 64,
      },
      sameAs: [
        'https://twitter.com/resumebuilder',
        'https://github.com/rahulkumar900/resume-builder-final',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://resumebabu.com/contact',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://resumebabu.com/#software',
      name: 'ResumeBuilder AI Resume Studio',
      operatingSystem: 'All',
      applicationCategory: 'BusinessApplication',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '2840',
        bestRating: '5',
        worstRating: '1',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        '30 ATS-Compliant Resume & CV Templates',
        'Real-Time A4 Multi-Page Split Visualizer (GhostDOM)',
        'Instant ATS Keyword Scoring and Duplicate Detection',
        'Targeted Job Description Tailoring Engine',
        'Zero-Watermark Crisp Vector PDF Export',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${inter.variable} ${roboto.variable} ${sourcesans.variable} ${poppins.variable} ${montserrat.variable} ${lato.variable} ${raleway.variable} ${rubik.variable} ${opensans.variable} ${garamond.variable} ${playfair.variable} ${merriweather.variable} ${outfit.variable} ${jakarta.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme')||localStorage.getItem('shadcn-theme-mode');var p=localStorage.getItem('shadcn-theme-preset')||'emerald';var d=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}document.documentElement.setAttribute('data-theme',p);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans transition-colors duration-200">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
