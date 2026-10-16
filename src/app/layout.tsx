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
  metadataBase: new URL('https://resumebuilder.app'),
  title: {
    default: 'ResumeBuilder - AI Resume Builder, ATS Checker & Resume Examples',
    template: '%s | ResumeBuilder',
  },
  description: 'Build an ATS-friendly resume tailored to the job you want. 100% free resume builder with 30 ATS templates, real-time A4 pagination, and vector PDF exports.',
  keywords: [
    'resume builder',
    'cv maker',
    'resume maker',
    'free resume builder',
    'build your resume',
    'curriculum vitae maker',
    'ai resume builder',
    'resume maker free',
    'create resume online free',
    'resume builder for freshers',
    'ats friendly resume template',
    'online resume maker',
    'resume builder india',
    'generate resume',
    'resume format for freshers',
    'cv builder free',
  ],
  alternates: {
    canonical: 'https://resumebuilder.app',
  },
  openGraph: {
    title: 'ResumeBuilder - Free AI Resume Builder & ATS Resume Checker',
    description: 'Create an ATS-friendly resume tailored to any job description. 30 ATS templates, real-time A4 page-split, vector PDF export without watermark or payment.',
    url: 'https://resumebuilder.app',
    siteName: 'ResumeBuilder',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeBuilder - Free AI Resume Builder & ATS Resume Checker',
    description: 'Create an ATS-friendly resume tailored to any job description. 100% free forever.',
    creator: '@resumebuilder',
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
      '@id': 'https://resumebuilder.app/#website',
      url: 'https://resumebuilder.app',
      name: 'ResumeBuilder',
      description: 'Free AI Resume Builder, ATS Checker, and Career Platform',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://resumebuilder.app/examples?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://resumebuilder.app/#organization',
      name: 'ResumeBuilder',
      url: 'https://resumebuilder.app',
      logo: 'https://resumebuilder.app/icon.png',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://resumebuilder.app/#software',
      name: 'ResumeBuilder AI Resume Studio',
      operatingSystem: 'All',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '12 ATS-Compliant Resume Templates',
        'Real-Time A4 Multi-Page Split Visualizer',
        'Instant ATS Keyword Scoring and Duplicate Detection',
        'Targeted Job Description Tailoring',
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
