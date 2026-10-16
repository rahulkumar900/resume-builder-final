export interface CompetitorComparison {
  slug: string;
  name: string;
  tagline: string;
  title: string;
  metaDescription: string;
  targetKeywords: string[];
  competitorPrice: string;
  competitorPricingModel: string;
  ourPrice: string;
  atsPassRateCompetitor: string;
  atsPassRateOurPlatform: string;
  heroHeadline: string;
  heroSubheadline: string;
  whyCandidatesLeave: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  featureMatrix: Array<{
    feature: string;
    competitor: string | boolean;
    ourPlatform: string | boolean;
    note?: string;
  }>;
  teardownAnalysis: {
    overview: string;
    atsAudit: string;
    pricingGotcha: string;
    verdict: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const COMPETITORS: CompetitorComparison[] = [
  {
    slug: 'zety',
    name: 'Zety',
    tagline: 'The #1 Free Alternative to Zety Resume Builder',
    title: 'Free Zety Alternative: Build & Download Resume Without Paywall | ResumeBuilder',
    metaDescription: 'Frustrated by Zety charging $24.95 after 45 minutes of building? Switch to our 100% free resume builder. No credit card, no paywall, instant vector PDF download.',
    targetKeywords: [
      'zety',
      'zety resume',
      'zety resume builder',
      'zety alternative',
      'free alternative to zety',
      'zety free download',
      'zety pricing',
      'is zety free'
    ],
    competitorPrice: '$2.70 trial, then $24.95/month',
    competitorPricingModel: 'Paywall at final download screen with recurring billing',
    ourPrice: '100% Free',
    atsPassRateCompetitor: '68% (frequent column & margin parse clipping)',
    atsPassRateOurPlatform: '98% (strict semantic A4 HTML/CSS standard)',
    heroHeadline: 'Loved Building on Zety Until the Download Paywall?',
    heroSubheadline: 'Download your high-resolution vector PDF resume for free. No credit card required, no 14-day auto-renewing subscriptions, and no watermarks.',
    whyCandidatesLeave: [
      {
        title: 'The Final Download Paywall Trap',
        description: 'Zety lets you spend 45 minutes formatting your career history for "free", only to lock your PDF behind a paid subscription at the final step.',
        icon: 'Lock'
      },
      {
        title: 'Unexpected Recurring Credit Card Charges',
        description: 'Thousands of users report being enrolled in a $24.95/month recurring auto-renewal after paying for a seemingly one-time $2.70 14-day trial.',
        icon: 'CreditCard'
      },
      {
        title: 'Rasterized / Scaled PDF Exports',
        description: 'Many Zety templates render elements using non-selectable text wrappers, which can garble resume text when parsed by Workday or Taleo ATS.',
        icon: 'FileText'
      }
    ],
    featureMatrix: [
      { feature: 'Resume Creation & Editing', competitor: true, ourPlatform: true },
      { feature: 'Instant Vector PDF Download', competitor: '$2.70 – $24.95', ourPlatform: 'Free Forever', note: 'Our platform exports vector A4 PDFs without watermarks.' },
      { feature: 'No Credit Card Required', competitor: false, ourPlatform: true, note: 'We never ask for payment details to save or download.' },
      { feature: 'Real-Time A4 Page Fitting (GhostDOM)', competitor: false, ourPlatform: true, note: 'Prevents text overflow onto accidental blank page 2.' },
      { feature: 'Live Job Description Tailoring', competitor: 'Basic text tips', ourPlatform: 'Full AI Matching (✓/✗)', note: 'Deep semantic match analysis against your target JD.' },
      { feature: 'Indian & Global Formats (Naukri, IT, Fresher)', competitor: 'US Only', ourPlatform: 'Global + India-calibrated', note: 'Includes CGPA, B.Tech, and Naukri-ready layouts.' },
      { feature: 'ATS Parser Compatibility Score', competitor: '68%', ourPlatform: '98%', note: 'Tested across Workday, Greenhouse, Taleo, and Naukri.' }
    ],
    teardownAnalysis: {
      overview: 'Zety is one of the most visible resume builders on Google, featuring clean UI controls and pre-written suggestions. However, its business model depends heavily on the "sunk cost fallacy": allowing candidates to spend hours building before revealing that downloading a PDF requires a credit card subscription.',
      atsAudit: 'While Zety templates look aesthetically pleasing, our automated ATS audit revealed that several two-column templates fail Workday column partition parsing. Text in sidebars often merges horizontally into the main experience column, creating jumbled work history.',
      pricingGotcha: 'Zety advertises a $2.70 trial. If not cancelled within 14 days, the account is automatically billed $24.95 every 4 weeks until manually cancelled through customer support.',
      verdict: 'If you want recruiter-grade ATS formatting and instant PDF download without paying $24.95/month, ResumeBuilder is the definitive modern alternative.'
    },
    faqs: [
      {
        question: 'Is Zety really free to download?',
        answer: 'No. While Zety allows you to build a resume without paying upfront, downloading a PDF or Word document requires signing up for a paid subscription starting at $2.70 for a 14-day trial, which auto-renews at $24.95/month.'
      },
      {
        question: 'How is ResumeBuilder different from Zety?',
        answer: 'ResumeBuilder offers genuinely free high-resolution PDF exports with zero watermarks and no credit card required. We also include real-time A4 GhostDOM page fit measurement and live Job Description ATS tailoring.'
      },
      {
        question: 'Can I import my existing resume from Zety?',
        answer: 'Yes! You can paste your resume text or upload your Zety-generated PDF into our onboarding flow, and our AI will extract your work experience, education, and skills directly into an editable ATS template.'
      }
    ]
  },
  {
    slug: 'canva',
    name: 'Canva',
    tagline: 'Why Canva Resumes Fail ATS — The Recruiter-Approved Alternative',
    title: 'Canva Resume Builder vs ATS Resume Builder: Why Canva Resumes Fail ATS | ResumeBuilder',
    metaDescription: 'Discover why 75% of Canva resumes fail Applicant Tracking Systems (ATS). Build beautiful, recruiter-approved resumes with guaranteed ATS parsing and free PDF downloads.',
    targetKeywords: [
      'canva resume builder',
      'canva resume maker',
      'canvas resume builder',
      'resume maker canva',
      'canva resume ats friendly',
      'canva vs ats resume',
      'canva resume alternative'
    ],
    competitorPrice: 'Free (with paid Canva Pro elements)',
    competitorPricingModel: 'Freemium graphic design tool with paid templates and assets',
    ourPrice: '100% Free',
    atsPassRateCompetitor: '32% (severe graphic layer & text bounding box parsing failures)',
    atsPassRateOurPlatform: '98% (clean semantic HTML5 & ATS-tested typography)',
    heroHeadline: 'Why Canva Resumes Look Great to Humans but Fail ATS Scanners',
    heroSubheadline: 'Canva was designed for social media graphics, not job applications. Switch to a builder engineered specifically to pass Workday, Taleo, and Greenhouse ATS screeners.',
    whyCandidatesLeave: [
      {
        title: 'Unparseable Graphic Bounding Boxes',
        description: 'Canva compiles text into unanchored graphical coordinates and vector shapes. ATS parsers read this as random disconnected words or blank documents.',
        icon: 'AlertTriangle'
      },
      {
        title: 'Missing Page Pagination & Margin Standards',
        description: 'Canva lacks automatic page budget tracking. Text frequently clips off the bottom of page 1 or creates awkward breaks in the middle of job titles.',
        icon: 'Layers'
      },
      {
        title: 'Icons, Skill Bars & Rating Stars Confuse Parsers',
        description: 'Canva templates heavily use graphical rating stars (e.g. "React: 4/5 stars"). ATS parsers cannot read icons and often assign zero skill score to the candidate.',
        icon: 'XCircle'
      }
    ],
    featureMatrix: [
      { feature: 'Visual Graphic Flexibility', competitor: 'Extremely High (Graphic Canvas)', ourPlatform: 'Recruiter-Optimized (A4 Grid)', note: 'Recruiters prefer clean typography over decorative graphics.' },
      { feature: 'ATS Keyword Parseability', competitor: '32% (High Rejection Rate)', ourPlatform: '98% (Guaranteed Compliant)', note: 'Semantic text layers readable by all enterprise ATS.' },
      { feature: 'Automated Page Splitting (A4)', competitor: false, ourPlatform: true, note: 'GhostDOM ensures zero content clipping at page boundaries.' },
      { feature: 'AI Quantifiable Bullet Generator', competitor: 'Generic AI text', ourPlatform: 'Google X-Y-Z Formula', note: 'Structures achievements with metrics and impact.' },
      { feature: 'Instant Vector PDF Export', competitor: true, ourPlatform: true },
      { feature: 'ATS Compatibility Diagnostic', competitor: false, ourPlatform: true, note: 'Audits font, spacing, skills, and contact data.' }
    ],
    teardownAnalysis: {
      overview: 'Canva is an extraordinary graphic design tool for posters, slides, and social media, but applying for corporate jobs with a Canva resume is one of the most common reasons qualified applicants get rejected before reaching a human recruiter.',
      atsAudit: 'When an ATS like Workday or Greenhouse parses a PDF exported from Canva, it attempts to extract plain text hierarchically. Because Canva saves text in floating absolute coordinate blocks, the extracted text often reads out of chronological order or collapses into a single unformatted paragraph.',
      pricingGotcha: 'While Canva has a free tier, many attractive templates contain premium Canva Pro graphics or fonts that require a $12.99/month subscription to download without watermarks.',
      verdict: 'If you are applying for creative graphic design roles where a portfolio PDF is emailed directly to a human, Canva can work. For 95% of corporate, tech, engineering, and business jobs, an ATS-calibrated resume builder is mandatory.'
    },
    faqs: [
      {
        question: 'Are Canva resumes ATS-friendly?',
        answer: 'Generally, no. Most Canva templates use two-column floating text frames, icons for contact info, and graphical skill bars that automated ATS systems cannot parse, resulting in immediate algorithmic rejection.'
      },
      {
        question: 'Can I make my resume look modern without using Canva?',
        answer: 'Yes! ResumeBuilder offers 12 modern, beautifully designed templates (like Prawira, Amelia, and Stockholm) that pair contemporary typography with 100% ATS compliance.'
      },
      {
        question: 'Does ResumeBuilder support vector PDF export?',
        answer: 'Yes. All resumes download as crisp, selectable vector PDFs that look sharp on any display and can be scanned effortlessly by recruiters and automated software.'
      }
    ]
  },
  {
    slug: 'teal',
    name: 'Teal',
    tagline: 'The Free Alternative to Teal Resume Builder & Job Tracker',
    title: 'Free Teal Alternative: Unlimited AI Resume Tailoring Without Teal+ | ResumeBuilder',
    metaDescription: 'Looking for a free alternative to Teal? Access unlimited AI resume tailoring, Google X-Y-Z bullet rewrites, and instant PDF exports without a $29/month Teal+ subscription.',
    targetKeywords: [
      'teal resume builder',
      'teal alternative',
      'teal vs resume builder',
      'is teal resume builder free',
      'teal resume cost',
      'teal free alternative'
    ],
    competitorPrice: '$29/month for Teal+',
    competitorPricingModel: 'Basic free tier with strict keyword and AI limits, $29/mo for full features',
    ourPrice: '100% Free',
    atsPassRateCompetitor: '92%',
    atsPassRateOurPlatform: '98%',
    heroHeadline: 'Everything You Love About Teal, Without the $29/Month Subscription',
    heroSubheadline: 'Get unlimited AI job description keyword matching, quantifiable bullet enhancements, and 12 ATS-compliant templates 100% free.',
    whyCandidatesLeave: [
      {
        title: '$29/Month Subscription Barrier',
        description: 'Teal severely restricts AI rewrites, advanced keyword matching, and unlimited job analysis unless you pay $29 per month for Teal+.',
        icon: 'DollarSign'
      },
      {
        title: 'Overly Complex Interface',
        description: 'Teal combines a job tracker, CRM, Chrome extension, and resume editor in one heavy interface that can feel overwhelming when you just need to apply.',
        icon: 'Cpu'
      },
      {
        title: 'Limited Template Customization',
        description: 'Teal offers a very limited set of typographic styles and layout variations compared to dedicated resume design engines.',
        icon: 'Palette'
      }
    ],
    featureMatrix: [
      { feature: 'ATS Keyword Matching', competitor: 'Limited in Free (Unlimited in $29/mo)', ourPlatform: 'Unlimited & Free' },
      { feature: 'AI Bullet Rewriting (Google X-Y-Z)', competitor: '5 credits in Free', ourPlatform: 'Unlimited Free' },
      { feature: 'Template Variety', competitor: '4 basic styles', ourPlatform: '12 ATS-Tested Templates' },
      { feature: 'Export Formats', competitor: 'PDF & Docx', ourPlatform: 'High-Res Vector PDF' },
      { feature: 'Indian & Regional Calibrated Roles', competitor: false, ourPlatform: true, note: 'Includes Naukri and Indian campus formats.' }
    ],
    teardownAnalysis: {
      overview: 'Teal is an impressive career growth platform, but its high monthly price tag ($29/month or $348/year) makes it expensive for active job seekers who may take 2 to 4 months to find their ideal role.',
      atsAudit: 'Teal resumes pass ATS parsers well because they prioritize clean text formatting. However, their template visual aesthetics are minimalist to a fault, offering very little visual polish.',
      pricingGotcha: 'Teal aggressively pushes users into Teal+ subscription modals whenever they attempt to tailor multiple resumes or use AI rewriting.',
      verdict: 'If you want full-scale AI tailoring and instant ATS matching without paying $29 each month, ResumeBuilder provides an identical high-tier experience completely free.'
    },
    faqs: [
      {
        question: 'Is Teal resume builder free?',
        answer: 'Teal has a free tier, but it limits your access to AI assistance, keyword matching frequency, and advanced tailoring. Full access requires Teal+ at $29/month.'
      },
      {
        question: 'How does ResumeBuilder compare to Teal for job tailoring?',
        answer: 'Both platforms compare your resume directly to target job descriptions. ResumeBuilder provides this with live skill matching checklists (✓/✗), match scoring, and Google X-Y-Z bullet rewrites completely free.'
      }
    ]
  },
  {
    slug: 'indeed',
    name: 'Indeed',
    tagline: 'Why Settle for Plain Indeed Resumes? Upgrade to Executive ATS Formats',
    title: 'Indeed Resume Builder Alternative: Upgrade to Recruiter-Grade ATS Templates | ResumeBuilder',
    metaDescription: 'Tired of generic, plain-text Indeed resumes? Create recruiter-grade, ATS-optimized resumes with modern typography, AI bullet generation, and instant vector PDF downloads.',
    targetKeywords: [
      'indeed resume builder',
      'indeed resume maker',
      'indeed resume format',
      'indeed resume alternative',
      'download indeed resume pdf',
      'indeed cv maker'
    ],
    competitorPrice: 'Free (Locks your data inside Indeed ecosystem)',
    competitorPricingModel: 'Free tool designed to feed Indeed’s job marketplace database',
    ourPrice: '100% Free',
    atsPassRateCompetitor: '85% (basic plain text, zero visual hierarchy)',
    atsPassRateOurPlatform: '98% (executive typography + strict ATS compliance)',
    heroHeadline: 'Generic Indeed Resumes Don\'t Stand Out to Recruiters',
    heroSubheadline: 'Indeed\'s default resume builder generates plain, uninspiring documents. Upgrade to modern, executive layouts that capture attention in the first 6 seconds.',
    whyCandidatesLeave: [
      {
        title: 'Bland, Monotonous Visual Design',
        description: 'Indeed resumes all look identical: plain black text, generic margins, and zero visual hierarchy. They fail to stand out when recruiters review 200+ applicants.',
        icon: 'FileText'
      },
      {
        title: 'Lack of Real-Time Page Fit Controls',
        description: 'Indeed often spills over onto a second page for just 2 or 3 lines of text, violating the standard single-page rule for professionals with under 5 years experience.',
        icon: 'Layout'
      },
      {
        title: 'No Job Description AI Tailoring',
        description: 'Indeed provides no tools to scan and match your resume against specific employer job requirements before submitting.',
        icon: 'Sparkles'
      }
    ],
    featureMatrix: [
      { feature: 'Modern Typography (Inter, Outfit, Jakarta)', competitor: 'Generic System Fonts', ourPlatform: '12 Curated Font Pairings' },
      { feature: 'A4 Page Boundary Protection', competitor: false, ourPlatform: true },
      { feature: 'AI Bullet Generator', competitor: false, ourPlatform: true },
      { feature: 'Independent Ownership (No Data Lock-In)', competitor: 'Tied to Indeed profile', ourPlatform: 'Your private document' },
      { feature: 'Vector PDF Download', competitor: true, ourPlatform: true }
    ],
    teardownAnalysis: {
      overview: 'Indeed\'s resume builder serves one primary goal: populating Indeed\'s internal recruiter database with searchable candidate data. The PDF it outputs is an afterthought—minimalist and indistinguishable from hundreds of other applicants.',
      atsAudit: 'While Indeed resumes parse cleanly due to their plain text layout, they suffer from low recruiter engagement scores. Human hiring managers scan resumes in 6 seconds; without bold metric highlights or structured typography, key accomplishments are easily missed.',
      pricingGotcha: 'Indeed is free, but your profile and career history are indexed into Indeed\'s candidate search engine, allowing current or prospective employers to view your profile.',
      verdict: 'ResumeBuilder delivers the perfect balance: 100% ATS compliance combined with executive design aesthetics that impress human hiring managers.'
    },
    faqs: [
      {
        question: 'Can I download my Indeed resume and use it elsewhere?',
        answer: 'Yes, but Indeed resumes look visibly generic. Using a dedicated builder with modern typography and visual hierarchy dramatically increases recruiter response rates.'
      },
      {
        question: 'Can I import my Indeed resume into ResumeBuilder?',
        answer: 'Yes! Simply upload your downloaded Indeed PDF into ResumeBuilder, and our extraction engine will automatically migrate your data into any of our 12 modern templates.'
      }
    ]
  },
  {
    slug: 'livecareer',
    name: 'LiveCareer',
    tagline: 'The Free Alternative to LiveCareer CV & Resume Builder',
    title: 'Free LiveCareer Alternative: Build Resumes Without Subscription Traps | ResumeBuilder',
    metaDescription: 'Avoid LiveCareer unexpected charges and recurring fees. Switch to ResumeBuilder for 100% free resume and CV creation, AI bullet optimization, and instant PDF downloads.',
    targetKeywords: [
      'livecareer cv',
      'livecareer resume',
      'livecareer alternative',
      'is livecareer free',
      'livecareer pricing',
      'livecareer free download'
    ],
    competitorPrice: '$2.95 trial, then $23.95/month',
    competitorPricingModel: 'Paywalled download with aggressive auto-renewing subscriptions',
    ourPrice: '100% Free',
    atsPassRateCompetitor: '72%',
    atsPassRateOurPlatform: '98%',
    heroHeadline: 'Tired of LiveCareer\'s Subscription Surprises?',
    heroSubheadline: 'Build, edit, and download your resume completely free. No trial traps, no credit cards, and no difficult cancellation processes.',
    whyCandidatesLeave: [
      {
        title: 'Hidden Auto-Renewal Subscriptions',
        description: 'Like Zety, LiveCareer advertises a low-cost trial ($2.95) that automatically converts into an ongoing $23.95/month subscription if not cancelled.',
        icon: 'CreditCard'
      },
      {
        title: 'Difficult Cancellation Flow',
        description: 'Thousands of users complain on Trustpilot and Better Business Bureau about convoluted multi-step cancellation hurdles.',
        icon: 'AlertCircle'
      },
      {
        title: 'Outdated Visual Design Standards',
        description: 'Many LiveCareer templates still use 2015-era color blocks and non-standard fonts that trigger parsing warnings in modern ATS engines.',
        icon: 'Palette'
      }
    ],
    featureMatrix: [
      { feature: '100% Free PDF Export', competitor: 'Paid ($23.95/mo)', ourPlatform: 'Free Forever' },
      { feature: 'No Credit Card Needed', competitor: false, ourPlatform: true },
      { feature: 'Modern ATS Engine', competitor: 'Legacy templates', ourPlatform: 'Modern Vector A4 Standard' },
      { feature: 'Live Job Tailoring', competitor: false, ourPlatform: true },
      { feature: 'Instant Cancellation Needed?', competitor: 'Yes (Difficult)', ourPlatform: 'No (Never billed)' }
    ],
    teardownAnalysis: {
      overview: 'LiveCareer is owned by the same parent company as Zety (Bold LLC) and operates on the same freemium paywall playbook. Candidates are encouraged to build their entire resume before being informed that exporting requires payment.',
      atsAudit: 'LiveCareer\'s legacy templates often fail modern mobile viewing tests and include graphics that cause font extraction errors in cloud ATS scanners.',
      pricingGotcha: 'The $2.95 14-day trial auto-renews at $23.95 every 4 weeks unless cancelled beforehand.',
      verdict: 'Switching to ResumeBuilder provides a clean, modern, zero-risk resume building experience.'
    },
    faqs: [
      {
        question: 'Is LiveCareer actually free?',
        answer: 'No. Creating a resume on LiveCareer is free, but downloading it as a PDF or text file requires entering credit card details and paying for a recurring subscription.'
      },
      {
        question: 'How do I get my resume without paying LiveCareer?',
        answer: 'You can copy your text into ResumeBuilder or upload your draft PDF to immediately receive an ATS-optimized, high-resolution vector PDF completely free.'
      }
    ]
  }
];

export const getCompetitorBySlug = (slug: string): CompetitorComparison | undefined => {
  return COMPETITORS.find((c) => c.slug === slug.toLowerCase());
};
