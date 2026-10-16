export const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Orchestrated', 'Engineered', 'Overhauled',
  'Accelerated', 'Formulated', 'Pioneered', 'Streamlined', 'Delivered',
  'Cultivated', 'Optimized', 'Automated', 'Revitalized', 'Maximized',
];

export interface SuggestionCategory {
  id: string;
  label: string;
  iconName?: string;
  items: {
    text: string;
    impactTag?: string;
    keywords?: string[];
  }[];
}

export const CATEGORIZED_SUMMARY_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: 'software',
    label: 'Software & Cloud',
    items: [
      {
        text: 'High-impact software engineering leader with 6+ years of experience architecting distributed cloud systems, modern web platforms, and driving engineering velocity by 35%.',
        impactTag: 'Engineering Leadership',
        keywords: ['full-stack', 'cloud', 'architecture', 'react', 'node', 'distributed systems'],
      },
      {
        text: 'Performance-driven Full-Stack Engineer adept at designing microservices, zero-downtime CI/CD pipelines, and high-concurrency APIs serving 5M+ monthly users.',
        impactTag: 'Full Stack & Scale',
        keywords: ['microservices', 'scale', 'backend', 'performance', 'cloud'],
      },
      {
        text: 'Frontend Architect specialized in React, Next.js, and design system governance. Passionate about web performance, Core Web Vitals, and WCAG accessibility standards.',
        impactTag: 'Frontend & UI',
        keywords: ['frontend', 'react', 'nextjs', 'web vitals', 'design systems'],
      },
    ],
  },
  {
    id: 'product_design',
    label: 'Product & Design',
    items: [
      {
        text: 'Results-oriented Product Designer passionate about crafting accessible, high-conversion design systems and intuitive user journeys for 2M+ active SaaS users.',
        impactTag: 'UI/UX & Systems',
        keywords: ['figma', 'design systems', 'product design', 'user experience', 'accessibility'],
      },
      {
        text: 'Strategic Product Manager with 5+ years driving 0-to-1 B2B product growth, optimizing user onboarding funnels, and aligning multi-disciplinary teams with executive business OKRs.',
        impactTag: 'Product Management',
        keywords: ['product', 'roadmap', 'growth', 'agile', 'saas'],
      },
    ],
  },
  {
    id: 'marketing_sales',
    label: 'Marketing & Sales',
    items: [
      {
        text: 'Data-driven Growth Marketer with a track record of scaling ARR from $2M to $15M via paid acquisition channels, product-led growth, and conversion rate optimization.',
        impactTag: 'Growth & ARR',
        keywords: ['growth', 'marketing', 'conversion', 'analytics', 'paid media'],
      },
      {
        text: 'Enterprise Account Executive with a history of exceeding annual quota by 130%+, establishing enterprise partnerships, and shortening sales cycles by 25%.',
        impactTag: 'Enterprise Sales',
        keywords: ['sales', 'quota', 'deals', 'negotiation', 'b2b'],
      },
    ],
  },
  {
    id: 'data_ai',
    label: 'Data & AI',
    items: [
      {
        text: 'Data Scientist & Machine Learning Engineer experienced in productionizing predictive models, LLM pipelines, and automated ETL workflows that save 200+ engineering hours monthly.',
        impactTag: 'AI & Data Science',
        keywords: ['ai', 'machine learning', 'python', 'analytics', 'llm'],
      },
    ],
  },
  {
    id: 'entry_general',
    label: 'Student / Early Career',
    items: [
      {
        text: 'Ambitious Computer Science graduate with strong foundational knowledge in full-stack web development, data structures, and hands-on internship experience in agile environments.',
        impactTag: 'Fresh Graduate',
        keywords: ['intern', 'graduate', 'entry-level', 'cs', 'developer'],
      },
    ],
  },
];

export const CATEGORIZED_BULLET_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: 'software',
    label: 'Software & Engineering',
    items: [
      {
        text: 'Architected and deployed distributed cloud microservices using Node.js and Kubernetes, scaling throughput by 45% while decreasing server costs by $18,000/yr.',
        impactTag: '+45% Throughput',
        keywords: ['cloud', 'microservices', 'kubernetes', 'backend', 'cost reduction'],
      },
      {
        text: 'Spearheaded frontend migration to Next.js App Router and TypeScript, reducing initial load latency by 62% and improving Lighthouse Core Web Vitals to 98.',
        impactTag: '62% Faster Load',
        keywords: ['next.js', 'react', 'typescript', 'performance', 'frontend'],
      },
      {
        text: 'Automated end-to-end testing and CI/CD pipelines via GitHub Actions, slashing release deployment cycles from 4 hours down to under 15 minutes.',
        impactTag: 'CI/CD Automation',
        keywords: ['ci/cd', 'testing', 'automation', 'devops'],
      },
      {
        text: 'Optimized PostgreSQL queries, indexing, and connection pooling, mitigating database bottlenecks and reducing p99 response times from 850ms to 95ms.',
        impactTag: '9x Latency Drop',
        keywords: ['database', 'sql', 'postgresql', 'optimization'],
      },
      {
        text: 'Mentored and paired with 5 junior engineers on test-driven development, code quality standards, and system design patterns.',
        impactTag: 'Team Mentorship',
        keywords: ['leadership', 'mentoring', 'tdd', 'agile'],
      },
    ],
  },
  {
    id: 'product_design',
    label: 'Product & Design',
    items: [
      {
        text: 'Built and governed a unified multi-brand design system in Figma and React, accelerating feature shipping speed by 35% across 4 scrum squads.',
        impactTag: '35% Faster Velocity',
        keywords: ['figma', 'design system', 'tokens', 'components'],
      },
      {
        text: 'Conducted 40+ moderated user research interviews and usability sessions, uncovering friction points and elevating checkout conversion by 28%.',
        impactTag: '+28% Conversion',
        keywords: ['user research', 'interviews', 'ux', 'conversion'],
      },
      {
        text: 'Designed end-to-end responsive mobile and desktop workflows for a complex analytics dashboard serving 150,000+ daily active users.',
        impactTag: '150k+ DAU',
        keywords: ['mobile', 'dashboard', 'analytics', 'saas'],
      },
    ],
  },
  {
    id: 'marketing_sales',
    label: 'Marketing & Sales',
    items: [
      {
        text: 'Scaled inbound organic organic traffic by 180% in 9 months by executing technical SEO overhaul and content marketing initiatives.',
        impactTag: '+180% Organic',
        keywords: ['seo', 'organic', 'content', 'growth'],
      },
      {
        text: 'Managed $250k monthly performance marketing budget across Google & Meta ads, lowering customer acquisition cost (CAC) by 32%.',
        impactTag: '-32% CAC',
        keywords: ['paid ads', 'cac', 'ppc', 'roi'],
      },
      {
        text: 'Exceeded FY sales quota by 142%, generating $3.4M in pipeline and closing 14 Fortune 500 enterprise software contracts.',
        impactTag: '142% Quota',
        keywords: ['sales', 'quota', 'pipeline', 'enterprise'],
      },
    ],
  },
  {
    id: 'management_operations',
    label: 'Leadership & Ops',
    items: [
      {
        text: 'Steered cross-functional delivery roadmap spanning engineering, design, and product marketing, delivering 6 major quarterly milestones on schedule.',
        impactTag: '100% On-Time',
        keywords: ['roadmap', 'strategy', 'leadership', 'scrum'],
      },
      {
        text: 'Restructured vendor agreements and software licensing footprint, saving $120,000 annually without impacting operational performance.',
        impactTag: '$120k Savings',
        keywords: ['procurement', 'cost reduction', 'operations'],
      },
    ],
  },
];

export const CATEGORIZED_PROJECT_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: 'fullstack_web',
    label: 'Full-Stack & Web Apps',
    items: [
      {
        text: 'Architected and deployed production full-stack application using Next.js, TypeScript, and PostgreSQL, servicing 10,000+ active monthly users with 99.9% uptime.',
        impactTag: '10k+ Active Users',
        keywords: ['fullstack', 'next.js', 'typescript', 'postgresql', 'production'],
      },
      {
        text: 'Engineered responsive client architecture with server-side rendering and static optimization, cutting initial page load times by 55% and achieving 98+ Lighthouse scores.',
        impactTag: '55% Faster Load',
        keywords: ['performance', 'ssr', 'lighthouse', 'optimization', 'frontend'],
      },
      {
        text: 'Integrated Stripe billing webhook processing and end-to-end authentication via OAuth2/JWT, handling $40k+ in test transaction volume securely.',
        impactTag: 'Stripe & Auth',
        keywords: ['stripe', 'payments', 'auth', 'security', 'webhooks'],
      },
      {
        text: 'Configured automated CI/CD pipeline with GitHub Actions, Docker containerization, and AWS ECS automated staging deployments.',
        impactTag: 'Docker & CI/CD',
        keywords: ['docker', 'ci/cd', 'aws', 'devops', 'automation'],
      },
    ],
  },
  {
    id: 'ai_data',
    label: 'AI, ML & Data Systems',
    items: [
      {
        text: 'Developed automated RAG pipeline utilizing LangChain, vector embeddings, and OpenAI APIs, reducing unstructured document query latency from 8s to 650ms.',
        impactTag: 'RAG & Vector Search',
        keywords: ['ai', 'rag', 'llm', 'embeddings', 'vector'],
      },
      {
        text: 'Trained and fine-tuned predictive machine learning models on 500k+ historical data points, improving recommendation accuracy by 32%.',
        impactTag: '32% Higher Accuracy',
        keywords: ['machine learning', 'python', 'pytorch', 'data', 'recommendation'],
      },
      {
        text: 'Built high-throughput real-time streaming pipeline using Apache Kafka and Redis, processing 1,200 events per second with sub-10ms delivery.',
        impactTag: '1.2k Events/sec',
        keywords: ['kafka', 'streaming', 'redis', 'real-time', 'events'],
      },
    ],
  },
  {
    id: 'mobile_tools',
    label: 'Mobile & Developer Tools',
    items: [
      {
        text: 'Published open-source CLI utility with 1,500+ GitHub stars, enabling developers to scaffold production-ready microservices in seconds.',
        impactTag: '1.5k GitHub Stars',
        keywords: ['open source', 'cli', 'developer tools', 'npm'],
      },
      {
        text: 'Built cross-platform mobile app in React Native with offline-first SQLite sync, reaching 4.8/5 star rating across 800+ user reviews.',
        impactTag: '4.8 Star Rating',
        keywords: ['react native', 'mobile', 'offline-first', 'ios', 'android'],
      },
    ],
  },
];

export const CATEGORIZED_EDUCATION_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: 'honors_awards',
    label: 'Academic Honors & Awards',
    items: [
      {
        text: "Dean's Honor List (Top 5% of class) across 6 consecutive academic semesters for academic excellence.",
        impactTag: 'Top 5% Honors',
        keywords: ['dean', 'honors', 'academic', 'gpa', 'excellence'],
      },
      {
        text: 'Graduated Magna Cum Laude with a cumulative GPA of 3.85/4.0.',
        impactTag: '3.85 GPA',
        keywords: ['magna cum laude', 'gpa', 'honors', 'distinction'],
      },
      {
        text: 'Recipient of Departmental Merit Scholarship and Outstanding Senior Capstone Award.',
        impactTag: 'Merit Award',
        keywords: ['scholarship', 'capstone', 'award', 'department'],
      },
    ],
  },
  {
    id: 'coursework',
    label: 'Relevant Coursework',
    items: [
      {
        text: 'Advanced Coursework: Distributed Systems, Database Architecture, Cloud Computing, Algorithms & Data Structures, Computer Networks.',
        impactTag: 'Computer Science Core',
        keywords: ['coursework', 'algorithms', 'distributed systems', 'cloud', 'databases'],
      },
      {
        text: 'Relevant Coursework: Machine Learning, Statistical Modeling, Deep Neural Networks, Applied Linear Algebra, Data Mining.',
        impactTag: 'AI & Data Science',
        keywords: ['coursework', 'machine learning', 'statistics', 'ai', 'data science'],
      },
      {
        text: 'Relevant Coursework: Corporate Finance, Quantitative Analysis, Financial Accounting, Econometrics, Risk Management.',
        impactTag: 'Finance & Analytics',
        keywords: ['coursework', 'finance', 'accounting', 'econometrics', 'quantitative'],
      },
    ],
  },
  {
    id: 'campus_leadership',
    label: 'Research & Leadership',
    items: [
      {
        text: 'Undergraduate Research Assistant in Intelligent Systems Lab; co-authored research paper accepted for publication.',
        impactTag: 'Published Co-Author',
        keywords: ['research', 'lab', 'publication', 'paper', 'symposium'],
      },
      {
        text: 'President of Student Technology Association, organizing 4 campus hackathons and technical seminars for 350+ attendees.',
        impactTag: 'Association President',
        keywords: ['president', 'hackathon', 'workshops', 'leadership', 'student'],
      },
      {
        text: 'Senior Capstone Project Lead: Architected full-stack campus collaboration platform adopted across 3 departments.',
        impactTag: 'Capstone Project Lead',
        keywords: ['capstone', 'project lead', 'architecture', 'full-stack'],
      },
    ],
  },
];

export const SUMMARY_SUGGESTIONS = CATEGORIZED_SUMMARY_SUGGESTIONS.flatMap((c) =>
  c.items.map((i) => i.text)
);

export const BULLET_SUGGESTIONS = CATEGORIZED_BULLET_SUGGESTIONS.flatMap((c) =>
  c.items.map((i) => i.text)
);

export const PROJECT_SUGGESTIONS = CATEGORIZED_PROJECT_SUGGESTIONS.flatMap((c) =>
  c.items.map((i) => i.text)
);

export const EDUCATION_SUGGESTIONS = CATEGORIZED_EDUCATION_SUGGESTIONS.flatMap((c) =>
  c.items.map((i) => i.text)
);

export function generateDynamicAiSuggestions(params: {
  role?: string;
  company?: string;
  projectName?: string;
  technologies?: string[];
  type: 'bullet' | 'summary' | 'project' | 'education';
  tone?: 'metrics' | 'leadership' | 'technical' | 'concise';
}): string[] {
  const role = params.role?.trim() || 'Professional';
  const company = params.company?.trim() || 'Organization';
  const projectName = params.projectName?.trim() || 'Software Platform';
  const techList = params.technologies && params.technologies.length > 0
    ? params.technologies.join(', ')
    : 'TypeScript, Next.js, Cloud APIs';
  const tone = params.tone || 'metrics';

  if (params.type === 'summary') {
    if (tone === 'metrics') {
      return [
        `Results-driven ${role} at ${company} with a proven record of exceeding business objectives, enhancing team velocity by 30%+, and scaling reliable operational workflows.`,
        `High-impact ${role} specializing in quantifiable performance optimization, data-backed execution, and driving multi-million dollar revenue pipelines.`,
        `Strategic ${role} recognized for bridging technical precision with product vision to deliver scalable solutions serving thousands of satisfied clients.`,
      ];
    }
    if (tone === 'leadership') {
      return [
        `Visionary ${role} leader adept at building and mentoring cross-functional teams, cultivating high-trust engineering cultures, and executing mission-critical roadmaps.`,
        `Collaborative ${role} with extensive experience steering stakeholder communication, strategic alignment, and scaling distributed team capabilities.`,
      ];
    }
    if (tone === 'technical') {
      return [
        `Deeply technical ${role} with hands-on expertise in full-lifecycle architecture, modern stack development, and resilient system infrastructure.`,
        `Specialized ${role} passionate about software craftmanship, clean architecture, and resolving complex low-latency challenges at scale.`,
      ];
    }
    return [
      `Dedicated ${role} focused on delivering high-standard outcomes, agile collaboration, and continuous improvement at ${company}.`,
      `Passionate ${role} with strong problem-solving acumen and end-to-end execution across modern industry standards.`,
    ];
  }

  if (params.type === 'project') {
    if (tone === 'metrics') {
      return [
        `Architected and deployed ${projectName} utilizing ${techList}, scaling to handle 10,000+ active user requests with sub-100ms response times.`,
        `Engineered automated workflows and data models in ${projectName}, reducing manual maintenance overhead by 45%.`,
        `Optimized client-side rendering and asset bundle sizes, cutting initial page load times by 50% and scoring 98+ on Lighthouse metrics.`,
        `Implemented end-to-end automated testing suite for ${projectName}, achieving 92% code coverage and zero critical production regressions.`,
      ];
    }
    if (tone === 'technical') {
      return [
        `Engineered robust full-stack architecture for ${projectName} using ${techList}, featuring modular components and type-safe data contracts.`,
        `Integrated secure authentication, role-based access control, and encrypted database connections across all endpoints.`,
        `Containerized ${projectName} with Docker and configured continuous deployment pipelines for automated zero-downtime releases.`,
        `Refactored state management and caching layers, eliminating redundant network calls and decreasing server load by 35%.`,
      ];
    }
    if (tone === 'leadership') {
      return [
        `Led technical design and architecture for ${projectName}, defining coding standards and API specifications for collaborating developers.`,
        `Authored comprehensive technical documentation, architecture diagrams, and onboarding guides for open-source contributors.`,
        `Presented ${projectName} case study to engineering stakeholders, highlighting scalable design patterns and architectural tradeoffs.`,
      ];
    }
    return [
      `Developed ${projectName} leveraging ${techList} to deliver an intuitive, responsive user experience.`,
      `Integrated third-party APIs and cloud storage services to support dynamic user workflows.`,
      `Documented codebase, deployment instructions, and test scenarios to facilitate seamless project maintenance.`,
    ];
  }

  if (params.type === 'education') {
    return [
      `Dean's Honor List across consecutive academic terms; maintained a 3.8+ GPA while completing rigorous coursework.`,
      `Completed comprehensive coursework in ${techList}, achieving top-tier marks on collaborative capstone projects.`,
      `Elected student representative and peer tutor, facilitating weekly study workshops for underclassmen.`,
      `Conducted faculty-mentored research culminating in a departmental honors distinction and symposium presentation.`,
    ];
  }

  // Bullets for Experience
  if (tone === 'metrics') {
    return [
      `Spearheaded core ${role} initiatives at ${company}, improving departmental throughput by 34% and cutting turnaround time in half.`,
      `Engineered scalable process frameworks that drove a 28% increase in client engagement and generated $150k+ in quarterly efficiencies.`,
      `Partnered cross-functionally to identify workflow bottlenecks, delivering automated solutions that reduced manual processing by 40%.`,
      `Maximized resource utilization across ${company}, achieving a 99.4% customer satisfaction score across 500+ service deliveries.`,
    ];
  }

  if (tone === 'leadership') {
    return [
      `Orchestrated project timelines and sprint backlogs for a team of 8 specialists, delivering 100% of quarterly milestones on schedule.`,
      `Mentored and coached junior team members, resulting in 2 internal promotions and elevating team code review standards.`,
      `Facilitated stakeholder retrospectives and strategic alignment meetings between ${company} leadership and operational teams.`,
      `Championed best-practice documentation and knowledge-sharing workshops, onboarding new team members 50% faster.`,
    ];
  }

  if (tone === 'technical') {
    return [
      `Architected fault-tolerant systems and automated deployment pipelines, ensuring 99.98% service uptime during peak traffic.`,
      `Refactored legacy codebases into modular, maintainable components, reducing technical debt and improving test coverage to 85%+.`,
      `Implemented comprehensive telemetry, logging, and automated alerting systems, cutting mean time to resolution (MTTR) by 45%.`,
      `Integrated third-party APIs and real-time streaming architectures to power low-latency customer data ingestion.`,
    ];
  }

  return [
    `Delivered key ${role} deliverables at ${company}, consistently meeting deadlines and high quality standards.`,
    `Collaborated effectively with cross-functional partners to execute day-to-day operations and solve emergent roadblocks.`,
    `Identified opportunities for workflow enhancements and implemented proactive solutions that saved 5+ hours per week.`,
    `Documented standard operating procedures and technical specifications to ensure process repeatability.`,
  ];
}
